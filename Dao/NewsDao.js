/**
 * @flow
 */

import {News} from "../Models/news"

export async function getListNew() {
    let rs
    await News.find((err, listNews) => {
        if(err){
            rs = null
        }else{

        }
    })

}