const Users = require("../models/user")
const jwt = require("jsonwebtoken")


const signup = (req, res) => {
    const {name, email, password} = req.body
    Users.findOne({email}).exec((error, user) => {
        if (user) {
            return res.status(400).json({message: "Такого пользователя уже существует!"})
        }
        const newUser = new Users(req.body)
        newUser.save((error, user) => {
            if (error) {
                return res.status(400).json({message: "Ошибка сохранения"})
            }
            return res.json({message: "Пользователь успешно зарегистрировано. Войдите!"})
        })
    })
}
//1- const user = await Users.find({email})
//2- .then(
//3- Users.find({email}, (error, user) => {(ошибка или пользователь)

const signin = (req, res) => {
    const {email, password} = req.body
    Users.findOne({email}).exec(async (error, user) => { //Получаем пользователя по Email
        if (!user) { //если пользователя не получил, то =>
            return res.status(400).json({message: "Пользователя не существует"})
        }
        const correctPassword = await user.authenticate(password)
        if (!correctPassword) {
            return res.status(401).json({message: "Ведите корректный email  пароль!"})
        }  //зная Token мы можем узнать про пользователя
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "2d"}) //при каждом афторизациии выдает новый токен! 1.данные уникальные, 2.Секретное слово, 3.Через 2дня из cooki удаляется токен
        return res.json({ //при успешном афторизации получает токен и =>
            token,
            user: {_id: user._id, email: user.email, role: user.role, name: user.name} //{ с пользователем}
        })
    })
}
const isAuthenticate = async (req, res) => {
    const token = req.header("auth-token")
    try {
        if (!token) {
            res.status(401).json({massage: "Токен не найден!"})
        }
        const payload = jwt.verify(token, process.env.SECRET_KEY) //verify - проверяет токен и секрет ключ
        const user = await Users.findById(payload._id) //найди пользователя с таким id
        res.json({token, user: {_id: user._id, email: user.email, role: user.role, name: user.name}}) // вери token и { с пользователем}
    } catch (e) {
        return res.status(401).json({massage: "Invalid token."})
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id).populate("news")   //req.params.id - это id который в routers/auth, populate - заменяет массив id на [news]. populate узнал, что надо брать models=> user.js [{....., ref"news"}]
        res.json({
            _id: user._id,   //в ручную убираем ключ password
            name: user.name,
            role: user.role,
            email: user.email,
            news: user.news
        })
    } catch (e) {
        return res.status(401).json({massage: "Неудалось получить пользователя "})
    }
}


module.exports = {signin, signup, isAuthenticate, getUserInfo}