import React, {useState} from 'react';
import {ToastContainer} from "react-toastify";
import Layout from "../../components/Layout";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/actions/userActions";


const Signin = () => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value}) //[e.target.name] - подставляет название переменной ...name это значение атрибута
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signIn(values))
    }


    return (
        <Layout>
            <ToastContainer/>
            {/*{*/}
            {/*    isAuth() ? <Redirect to="/" /> : null*/}
            {/*}*/}
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                        <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                        >
                            Sign in
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-normal mb-2"
                                   htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-normal mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                autoComplete="off"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                                type="submit">Sign in
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    );
};

export default Signin;