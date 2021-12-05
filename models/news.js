const mongoose = require("mongoose")


//Модель пользователя
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: { //Тот пользовать который создал news
        type: mongoose.Schema.Types.ObjectId,  //type для id будет mongoose-й id, возьмет id => пойдет в коллекцию users находит id пользователя, вытащит {с пользователем}
        ref: "users"   //новый для нас ключь ref - пользов-ль id которого будем хранить userId.type, где по факту находится {} с этим пользователем
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }]
}, {timestamps: true})

module.exports = mongoose.model("news", newsSchema)