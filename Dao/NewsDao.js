/**
 * @flow
 */

import {News} from "../Models/news"

export async function getListNew(callback: any) {
    let rs
    await News.find((err, listNews) => {
        callback(err, listNews)
    })

}