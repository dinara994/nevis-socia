const mongoose = require("mongoose")


//Модель пользователя
const commentsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "news"
    },
    user: { //Тот пользовать который создал news
        type: mongoose.Schema.Types.ObjectId,   //type для id будет mongoose-й id, возьмет id => пойдет в коллекцию users находит id пользователя, вытащит {с пользователем}
        ref: "users"  //новый для нас ключь ref - пользов-ль id которого будем хранить userId.type, где по факту находится {} с этим пользователем
    }
}, {timestamps: true})

module.exports = mongoose.model("comments", commentsSchema)