import axiosV1 from "../../services/api"; //создается свой axios() и передается в папку services => api.js


export const getNews = (dispatch) => {
    return (dispatch) => {
        dispatch({type: "BLOG_REQUEST"}) //dispatch - для запроса
        axiosV1('http://localhost:8080/api/v1/news')
            .then(({data}) => {
                dispatch({type: "BLOG_SUCCESS", payload: data}) // дожидаемся успеха и и выполняется BLOG_SUCCESS
            })
            .catch((error) => {
                dispatch({type: "BLOG_FAILED"}) //если ошибка то выполнится ошибка
            })
    }
}