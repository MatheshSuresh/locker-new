import React from 'react';
import "./login.css";
import useLoginForm from "./useLoginForm";
import validateInfo from './validate';
import { Icon } from "@iconify/react";
import { auth, provider } from '../../database/firebase';
import axios from 'axios';

const Login = () => {
    const { values, handleChange, handleSubmit, errors } = useLoginForm(validateInfo);
    const signin = async () => {
        var user = await axios.get(`http://localhost:3001/user/check`).then((res) => { return res.data })
        auth.signInWithPopup(provider).then(async (result) => {
            var checkuser = await user.filter((data) => { return data.email === result.user.email })
            if (checkuser.length === 0) {
                alert("You Are Not Valid User...")
            } else {
                sessionStorage.setItem('auth', JSON.stringify(checkuser[0].password))
                sessionStorage.setItem('useremail', checkuser[0].email)
                window.location.replace("/dashboard")
            }

        }).catch(alert)
    }
    return (
        <div className='login_page'>
            <form className='login' onSubmit={handleSubmit}>
                <img src="/assets/logo.png" alt='' className='logo' />
                <h1 className="login_Header">Welcome to Smart Locker</h1>
                <div className='login_Input'>
                    <input
                        className='login_Inputfields'
                        placeholder='Email'
                        name='email'
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                    >
                    </input>
                    <label htmlFor='username' className='label_Icon'>
                        <Icon icon="ant-design:user-outlined" />
                    </label>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='login_Input'>
                    <input
                        className='login_Inputfields'
                        name="password"
                        placeholder='Password'
                        type='password'
                        value={values.password}
                        onChange={handleChange}>
                    </input >
                    <label className='label_Icon'>
                        <Icon icon="bytesize:lock" />
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit"
                    className="login_Submit">Sign In</button>
                <p>OR</p>
                <button className='goolgle_Login' onClick={signin}>
                    <Icon icon="flat-color-icons:google" className='google_Logo' />
                    Login wih Google</button>
                <a className="forgot" href="/forgotpass">Forgot Password</a>
                <p className='register_Switch'>Dont have a Account?<a href="/Register">Register</a></p>
            </form>
        </div>
    )
}

export default Login;
