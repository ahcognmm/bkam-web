/**
 *@flow
 */
import {Manga, Reader} from './../Models/manga'

export function paging(res: any, req: any) {
    let quan = 20
    let page = req.query.page || 1
    let type = req.query.type

    if (type == 'manga') {
        Manga.find({})
            .sort({updateTime: -1})
            .skip(quan * (page - 1))
            .limit(quan)
            .exec((err, listManga) => {
                Manga.count((err, count) => {
                    if (err) throw err
                    let listMangaJson = JSON.stringify(listManga)
                    res.render('/listmanga.hbs', {
                        listMangaJson: listMangaJson,
                        current: page,
                        pages: Math.ceil(count / quan)
                    })
                })
            })
    }


}