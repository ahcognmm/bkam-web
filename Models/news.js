import mongoose from 'mongoose'
const news = mongoose.Schema({
    name: String,
    author: String,
    time: String,
    detail : String
})
const News = mongoose.model("News",news)
export {News}