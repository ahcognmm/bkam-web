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
    let count = 0
    let realReading = 0
    let updateTime = (new Date()).toJSON().slice(0, 10).replace(/[-T]/g, ':')

    let exist = await hasManga(name)

    let mangaR = new Reader({
        name: name,
        author: author,
        chap: chap,
        urls: urls,
        updateTime: updateTime,
        count: count,
        realReading: realReading
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
 *get manga by name and chap
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
 * @param manga : name of manga
 * @returns {Promise<void>}
 */
export async function getInforManga(manga: string, callback: any) {
    await Manga.findOne({name: manga}, async (err, manga) => {
        callback(err, manga)
    })
}

/**
 *
 * @param manga
 * @param chap
 * @param callback
 * @returns {Promise<void>}
 */
export async function addMangaCount(manga: string, chap: number, real: boolean, callback: any) {
    await getMangaReader(manga, chap, (err, manga) => {
        if (err) {
            callback(err)
        } else {
            let number = manga.count + 1
            manga.count = number
            if (real) {
                let number2 = manga.realReading + 1
                manga.realReading = number2
            }
            manga.save(err => {
                callback(err)
            })
        }
    })

}

/**
 * change rate
 * @param manga
 * @param callback
 * @returns {Promise<void>}
 */
export async function addRateDao(manga: string, newRate: number, callback: any) {
    Manga.findOne({name: manga}, (err, manga) => {
        if (err) {
            callback(err)
        } else {
            let number = manga.rate.totalRated + 1
            manga.rate.totalRated = number
            manga.rate.currentRate = newRate
            manga.save(err => {
                callback(err)
            })
        }
    })
}

/**
 * get manga by object Id
 * @param id
 * @param callback
 * @returns {Promise<void>}
 */
export async function getMangaReaderById(id: string, callback: any) {
    Reader.findOne({_id: Object(id)}, callback)
}