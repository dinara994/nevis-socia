const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const chalk = require("chalk")
require("dotenv").config() //запуск env
const authRouter = require("./routers/auth")
const newsRouter = require("./routers/news")
const commentsRouter =  require("./routers/comments")


const server = express()
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue("DB is connected!")))
    .catch(() => console.log(chalk.red("DB is No connected!")))

//промежуточные обработчики req
server.use(cors()) //позволяет иметь доступ из front с Одного адреса Back на другой адресс
server.use(express.json()) //позволяет в req body позволяет вставитть тот обьект, которое передаем через body

server.use("/api/v1", authRouter)
server.use("/api/v1/news", newsRouter)
server.use("/api/v1/comments", commentsRouter)

const port = 8080
server.listen(process.env.PORT || port, () => {
    console.log(chalk.magenta(`Server is started on the ${port}`))
})




