import mongoose from 'mongoose'

let bkam = "mongodb://127.0.0.1:27017/bkam"
mongoose.connect(bkam)

const manga = mongoose.Schema({
    name: String,
    author: String,
    updateTime: String,
    latestChap:Number,
    review:String
})
const Manga = mongoose.model("Manga",manga)

const mangareader = mongoose.Schema({
    name: String,
    author: String,
    chap: Number,
    urls:[String],
    updateTime:String
})
const Reader = mongoose.model("Reader",mangareader)

export {Manga, Reader}