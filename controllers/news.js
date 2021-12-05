const News = require("../models/news")
const User = require("../models/user")

const getAllNews = async (req, res) => {
    try {
        const news = await News.find({}).populate("user", "-password") //populate подставляет в место id реального  {с пользователем "user"}  и у этого {} убери ключ -password
        res.json(news)
    } catch (e) {
        res.status(400).json({massage: "Ошибка получения"})
    }
}
//populate - его задача заменять id внутри ключа userId на рейльный {с пользователем}

const getNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate("comments").populate({
            path: "comments",
            populate: "user"
        })
        res.json(news)
    } catch (e) {
        res.status(400).json({massage: "Ошибка получения"})
    }
}


const creatPost = async (req, res) => {
    try {
        const newPost = new News(req.body) // передаем ("title": "" and "description": "" , user: id- req.body)
        const savePost = await newPost.save()
        await User.findByIdAndUpdate(savePost.user, {$push: {news: savePost._id}})    //findByIdAndUpdate - найти пользователя, savePost.user - найти по id пользователя по, добавить в [] $push: {news: savePost._id}
        res.json(savePost) //вся новость сохраненная}
    } catch (e) {
        res.status(400).json({massage: "Ошибка сохранения"})
    }
}


module.exports = {creatPost, getAllNews, getNews}