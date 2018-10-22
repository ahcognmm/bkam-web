/**
 * @flow
 */

import {Manga, Reader} from "../Models/manga"

/**
 * @param manga : json manga include name, author, chap, urls
 * @returns {Promise<void>}
 */
export async function addManga(manga: any) {
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
        if (err) return 0
    })

    // exist = 1: manga has init
    // exist = 0: manga not in db
    if (exist == 1) {
        await Manga.findOne({name: name}, async (err, manga) => {
            if (err) return 0
            else {
                manga.latestChap = chap
                manga.save(async err => {
                    if (err) return 0
                    else return 1
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
            if (err) return 0
        })
    }
}

/**
 * @param manga : manga's name
 * @returns {Promise<void>}
 */
async function hasManga(manga: string) {
    Manga.findOne({name: manga}, async (err, manga) => {
        if (err) return 0
        else {
            if (manga) return 1
            else return 0
        }
    })
}

/**
 *
 * @param manga
 * @param chap
 * @returns {Promise<void>}
 */
export async function getMangaReader(manga: string, chap: number) {
    await Reader.findOne({name: manga, chap: chap}, async (err, manga) => {
        callbackManga(err, manga)
    })
}

/**
 *
 * @returns {Promise<void>}
 */
export async function getListManga() {
    await Manga.find(async (err, listManga) => {
        callbackManga(err, listManga)
    })
}

/**
 *
 * @param manga
 * @returns {Promise<void>}
 */
export async function getInforManga(manga: string) {
    await Manga.findOne({name: manga}, async (err, manga) => {
        callbackManga(err, manga)
    })
}

/**
 * callback function use in that js file
 * @param err
 * @param result
 * @returns {*}
 */
function callbackManga(err, result) {
    if (err) {
        return null
    } else {
        return result
    }
}