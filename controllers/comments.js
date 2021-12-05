const Comments = require("../models/comments")
const News = require("../models/news")
const User = require("../models/user");

const addComment = async (req, res) => {
    const comment = new Comments(req.body)
    const savedComment = await comment.save()
    await News.findByIdAndUpdate(savedComment.news, {$push: {comments: savedComment._id }}, {new: true})
  const user = await User.findById(savedComment.user)
    res.json({...savedComment.toObject(), user}) // toObject - метод преобразование из mongoose {} в обычный обьект
}

    module.exports = {addComment}