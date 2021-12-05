import React, {useState} from 'react';
import axios from "axios";
import Layout from "../../components/Layout";
import {toast, ToastContainer} from "react-toastify";

const CreatePost = () => {
    const user = JSON.parse(localStorage.getItem("user")) //получаем id пользователя
    const  [values, setValues] = useState({
        title: '',
        description: ''
    })

    const handleChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault()
axios.post("http://localhost:8080/api/v1/news", {...values, user: user._id })
    .then(() => {
        setValues({title: "", description: ""})
        toast.success("Новость успешно создана")
    }).catch((e) => toast.error(e.response.data.message)) //back что напишет то и придет
    }


    return (
        <Layout>
         <ToastContainer />    {/*верстка всплывающая*/}
            <div className="flex mx-auto items-center justify-center shadow-lg mt-24 mx-8 mb-4 max-w-lg">
                <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Title</h2>
                            <input type='text'
                                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                name="title" placeholder='Type title'
                                   value={values.title}
                                   onChange={handleChange}
                                   required/>
                        </div>
                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Description</h2>
                            <textarea
                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                            name="description" placeholder='Type description'
                            value={values.description}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div className="w-full md:w-full flex items-start md:w-full px-3">
                            <div className="-mr-1">
                                <input type='submit'
                                       className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                       value='Create post'/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
        ;
};

export default CreatePost;