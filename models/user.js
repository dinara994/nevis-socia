const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

//Модель пользователя
const userSchema = new mongoose.Schema({
    name: {
       type: String,
        required: true,
        max: 26,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        max: 26,
        trim: true
    },
    role: {
        type: String,
        default: "user"
    },
    news: [{type: mongoose.Schema.Types.ObjectId, ref: "news"}] //[] всех новостей которые он создар - ОДИН КО МНОГИМ искать поэтому id в новостях
}, {timestamps: true})

//промежуточные обработчики МИДЛВЭЙР - для сосзданию пользователя
userSchema.pre("save", async function (next){
    const user = this //obj
    user.password = await  bcrypt.hash(user.password, 10) //bcrypt зашифровает col 10, дожидается ответа затем next()
      next()
})

//процес проверка
userSchema.methods.authenticate = function (password){ //authenticate получает пороль
    const user = this
  return  bcrypt.compare(password, user.password) //bcrypt проверяет и возвращает true || false
}



module.exports = mongoose.model("users", userSchema)



