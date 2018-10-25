/**
 * @flow
 */

import {Manga, Reader} from "../Models/manga"

/**
 * @param manga : json manga include name, author, chap, urls
 * @returns {Promise<void>}
 */
export async function addManga(manga: any, callback: any) {
    let name = manga.name
    let author = manga.author
    let chap = manga.chap
    let urls = manga.urls
    let updateTime = (new Date()).toJSON().slice(0, 10).replace(/[-T]/g, ':')

    let exist = await hasManga(name)

    let mangaR = new Reader({
        name: name,
        author: author,
        chap: chap,
        urls: urls,
        updateTime: updateTime
    })
    await mangaR.save(async err => {
    })

    // exist = 1: manga has init
    // exist = 0: manga not in db
    if (exist == 1) {
        await Manga.findOne({name: name}, async (err, manga) => {
            if (err) return 0
            else {
                manga.latestChap = chap
                manga.save(async err => {
                    callback(err)
                })
            }
        })
    } else {
        let manga = new Manga({
            name: name,
            author: author,
            latestChap: chap,
            updateTime: updateTime,
            review: ""
        })
        await manga.save(async err => {
            callback(err)
        })
    }
}

/**
 * @param manga : manga's name
 * @returns {Promise<void>}
 */
async function hasManga(manga: string, callback: any) {
    Manga.findOne({name: manga}, async (err, manga) => {
        callback(err, manga)
    })
}

/**
 *
 * @param manga
 * @param chap
 * @returns {Promise<void>}
 */
export async function getMangaReader(manga: string, chap: number, callback: any) {
    await Reader.findOne({name: manga, chap: chap}, async (err, manga) => {
        callback(err, manga)
    })
}

/**
 *
 * @returns {Promise<void>}
 */
export async function getListManga(callback: any) {
    await Manga.find(async (err, listManga) => {
        callback(err, listManga)
    })
}

/**
 *
 * @param manga
 * @returns {Promise<void>}
 */
export async function getInforManga(manga: string, callback: any) {
    await Manga.findOne({name: manga}, async (err, manga) => {
        callback(err, manga)
    })
}