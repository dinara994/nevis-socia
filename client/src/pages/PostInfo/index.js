import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useParams} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import {toast, ToastContainer} from "react-toastify";


const PostInfo = () => {
    const {id} = useParams()
    const user = JSON.parse(localStorage.getItem("user"))
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [value, setValue] = useState({content: ""})

    const handleChange = (e) => {
        setValue({content: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/api/v1/comments", {...value, news: id, user: user._id})
            .then(({data}) => {
                setValue({content: ""})
                toast.success("Сохранено!")
                setPost({...post, comments: [...post.comments, data]})
            })
    }

    useEffect(() => {
        axios(`http://localhost:8080/api/v1/news/${id}`)
            .then(({data}) => {
                setPost(data)
                setIsLoading(false)
            })
    }, [id])


    return (
        <Layout>
            <ToastContainer/>
            <h2 className="text-4xl">{post.title}</h2>
            <p>{post.description}</p>
            {
                isLoading ?
                    <Spinner/> :
                    <>
                        <div>
                            {
                                post.comments.map(item =>
                                    <div key={item._id} className="mb-4">
                                        <div>Автор: {item.user.name}</div>
                                        <div>{item.content}</div>
                                    </div>
                                )
                            }
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full md:w-full mb-2 mt-2">
                                <h2 className="pt-3 pb-2 text-gray-800 text-lg">Comments:</h2>
                                <textarea
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    name="content" placeholder='Creat comment'
                                    value={value.content}
                                    onChange={handleChange}
                                    required/>
                            </div>
                            <div className="w-full md:w-full flex items-start md:w-full">
                                <div className="-mr-1">
                                    <input type='submit'
                                           className="bg-white text-gray-700 px-2 font-medium py-1 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                           value='Add comment'/>
                                </div>
                            </div>
                        </form>
                    </>
            }
        </Layout>
    );
};

export default PostInfo;