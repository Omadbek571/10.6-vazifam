import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)


    // validation emaildi
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // obshi validatsiya uchun
    function validate() {
        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }

    function handLogin(event) {
        event.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return;
        }

        const loginUser = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
        };
        setLoading(true)

        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, loginUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.message == "success") {

                    setUser(response.data.user)
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err);
            })

            .finally(() => {
                setLoading(false)
            })

    }

    return (
        <div className='mx-auto mt-32'>
            <h2 className='text-center  text-6xl mb-5 font-extrabold'>Login</h2>
            <form className='flex flex-col items-center'>
                <input ref={emailRef} className='p-3 mb-3 border rounded-md w-1/3  input input-bordered' type="email" defaultValue={"omadbek@gmail.com"} placeholder='Enter email...' />
                <input ref={passwordRef} className='p-3 mb-3 border rounded-md w-1/3  input input-bordered' type="password" defaultValue={"StrongPassword123!"} placeholder='Enter password...' />
                <button disabled={loading} onClick={handLogin} className='btn btn-success  w-1/3'>{loading ? "LOADING..." : "LOGIN"}</button>
                <Link className='mx-auto mt-2 hover:text-green-400' to="/register">Register</Link>
            </form>
        </div>
    );
}

export default Login;
