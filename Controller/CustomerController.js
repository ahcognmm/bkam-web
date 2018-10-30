/**
 *@flow
 */
let path = require('path')
import * as MangaDao from './../Dao/MangaDao'
import * as Define from './../Util/Define'

// export async function paging(req: any, res: any) {
//     let quan = 20
//     let page = req.query.page || 1
//     let type = req.query.type
//
//     if (type == Define.MANGA) {
//         MangaDao.getListManga(
//             (err, listManga) => {
//             Manga.count((err, count) => {
//                 if (err) throw err
//                 let listMangaJson = JSON.stringify(listManga)
//                 res.render('/listmanga.hbs', {
//                     listMangaJson: listMangaJson,
//                     current: page,
//                     pages: Math.ceil(count / quan)
//                 })
//             })
//         })
//     }
// }
/**
 * cap nhat danh gia truyen
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function rate(req: any, res: any) {
    let rate = req.query.rate
    let type = req.query.type
    let name = req.query.name
    if (type === Define.MANGA) {
        MangaDao.addRateDao(name, rate, err => {
            if (err) console.log('loi roi CustomerController.rate')
        })
    }
}

/**
 *  lay du lieu cua truyen can doc
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export async function getReaderPage(req: any, res: any, next: any) {
    let id = req.body.id
    let type = req.body.type
    if (type == Define.MANGA) {
        MangaDao.getMangaReaderById(id, (err, reader) => {
            if (err) {
                res.reader = ''
                next()
            } else {
                res.reader = reader
                next()
            }
        })
    }
}

/**
 * hien thi truyen can doc
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function showReaderPage(req: any, res: any) {
    if (res.reader != '') {
        res.render(path.join(__dirname, '../../views/manga.hbs'), {
            manga: res.reader
        })
    } else {
        res.render(path.join(__dirname, '../../views/404notfound.hbs'))
    }
}
