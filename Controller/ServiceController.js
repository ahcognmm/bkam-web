/**
 * @flow
 */

import * as Define from './../Util/Define'
import * as MangaDao from './../Dao/MangaDao'

/**
 * get people who exactly reading this page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function getTimeOnSite(req: any, res: any) {
    let name = req.body.name
    let type = req.body.type
    let chap = parseInt(req.body.chap)
    await add(name, chap, type, true)
}

/**
 * get page views
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function addHits(req: any, res: any) {
    let name = req.body.name
    let type = req.body.type
    let chap = parseInt(req.body.chap)
    await add(name, chap, type, false)
}

/**
 * add count and realReading function
 * @param name
 * @param chap
 * @param type
 * @param real
 * @returns {Promise<void>}
 */
async function add(name: string, chap: number, type: string, real: boolean) {
    if (type === Define.MANGA) {
        await MangaDao.addMangaCount(name, chap, real, err => {
            console.log("loi add ServiceController.addHits ", err)
        })
    } else if (type === Define.LIGHT_NOVEL) {

    }
}