import Cookies from "js-cookie";


export const authentication = (data) => {
    Cookies.set('token', data.token, {expires: 1}) //устанавливает Cookies и localStorage
    localStorage.setItem("user", JSON.stringify(data.user))
}

//isAuth().name
export const isAuth = () => {
    const token = Cookies.get("token")
    const user = JSON.parse(localStorage.getItem("user"))
    return !!(token && user) ? user: false; // !! - двойное отрицание true
}

export const clearUser = () => {
    Cookies.remove("user")
    localStorage.removeItem("user")
}
