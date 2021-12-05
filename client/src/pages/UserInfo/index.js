import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const UserInfo = () => {
    const {id} = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios(`http://localhost:8080/api/v1/user/${id}`)
            .then(({data}) => {
                setUser(data)
                setIsLoading(false)
            })
            // .catch((error) => error)
    }, [id])


    if (isLoading) {
        return <Spinner />
    }


    return (
        <Layout>
            <div className='flex'>
                <img src="https://picsum.photos/200/300?random=1" alt="people"/>
                <div className='mx-5 my-8'>
                    <h2>{user.name}</h2>
                    <span>{user.email}</span>
                </div>
            </div>
            <div className="mt-8">
                {
                    user.news.map(item =>
                        <Link to={`/news/${item._id}`} key={item._id}  >
                            <div className="my-3">{item.title}</div>
                        </Link>
                    )
                }
            </div>
        </Layout>
    );
};

export default UserInfo;