import axios, { Axios } from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)


    // validatsiya email
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    // validatsiya password
      function validatePassword(pw) {

        return /[A-Z]/       .test(pw) &&
               /[a-z]/       .test(pw) &&
               /[0-9]/       .test(pw) &&
               /[^A-Za-z0-9]/.test(pw) &&
               pw.length > 4;
    }

    // obshi validatsiya
    function validate() {
        if(usernameRef.current.value.length < 3) {
            alert("Username-da hatolik mavjud");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = "red"
            return false;
        }
        if(surnameRef.current.value.length < 3) {
            alert("Surname-da hatolik mavjud");
            surnameRef.current.focus();
            surnameRef.current.style.outlineColor = "red"
            return false;
        }
        if(!validateEmail(emailRef.current.value)) {
            alert("Email-da hatolik mavjud");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        if(!validatePassword(passwordRef.current.value)) {
            alert("Password da hatolik mavjud");
            passwordRef.current.focus();
            passwordRef.current.style.outlineColor = "red";
            return false;
        }
        if(passwordRef.current.value != rePasswordRef.current.value) {
            alert("Password-lar mos kelmadi");
            return false;
        }

        return true;
    }

    function handRegister(event) {
        event.preventDefault();

        const isValid = validate()
        if(!isValid) {
            return;
        }

        const user = {
            "email": emailRef.current.value,
            "firstName": usernameRef.current.value,
            "lastName": surnameRef.current.value,
            "password": passwordRef.current.value,
            "confirmPassword": rePasswordRef.current.value
        }
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, user, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if(data.data.message == "Ro'yxatdan muvaffaqiyatli o'tdingiz! Email tasdiqlash uchun havola yuborildi.") {
                    navigate("/login");
                    usernameRef.current.value = '';
                    surnameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    rePasswordRef.current.value = '';
                }
            })
            .catch(err => {console.log(err);})
            .finally(() => {
                setLoading(false)
            })




    }
  return (
    <div className='mx-auto mt-32'>
        <h2 className='text-center  text-6xl mb-5 font-extrabold'>Register</h2>
      <form className='flex flex-col items-center gap-4'>
        <input ref={usernameRef} className='input input-bordered input-accent w-full max-w-xs' type="text" placeholder='Enter name...'/>
        <input ref={surnameRef} className='input input-bordered input-accent w-full max-w-xs' type="text" placeholder='Enter surname...'/>
        <input ref={emailRef} className='input input-bordered input-accent w-full max-w-xs' type="email" placeholder='Enter email...'/>
        <input ref={passwordRef} className='input input-bordered input-accent w-full max-w-xs' type="password" placeholder='Create password...'/>
        <input ref={rePasswordRef} className='input input-bordered input-accent w-full max-w-xs' type="password" placeholder='Confirm password...'/>
        <button disabled={loading} onClick={handRegister} className='btn btn-success  w-1/3' >{loading ? "LOADING..." : "REGISTER"}</button>
        <Link className='mx-auto mt-2 hover:text-green-400' to="/login">Login</Link>
      </form>
    </div>
  )
}

export default Register
