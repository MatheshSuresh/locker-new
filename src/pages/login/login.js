import React from 'react';
import "./login.css";
import useLoginForm from "./useLoginForm";
import validateInfo from './validate';
import {Icon} from "@iconify/react";

const Login = () => {
    const {values,handleChange,handleSubmit,errors}=useLoginForm(validateInfo);
    return (
        <div className='login_page'>
                <form className='login' onSubmit={handleSubmit}>
                <img src="/assets/logo.png" alt='' className='logo'/>             
                <h1 className="login_Header">Welcome to Smart Locker</h1>
                <div className='login_Input'>
                <input
                className='login_Inputfields'
                placeholder='Username'
                name='username'
                type="text"
                value={values.username}
                onChange={handleChange}
                >
                </input>
                <label htmlFor='username' className='label_Icon'>
                <Icon icon="ant-design:user-outlined" />
                </label>
                {errors.username && <p>{errors.username}</p>}
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
                <button className='goolgle_Login'>
                <Icon icon="flat-color-icons:google" className='google_Logo' />
                    Login wih Google</button>
                <a className="forgot" href="/forgotpassword">Forgot Password</a>
                <p className='register_Switch'>Dont have a Account?<a href="/Register">Register</a></p>
                </form>
        </div>
    )
}

export default Login;
