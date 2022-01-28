import React from 'react';
import "./forgotpass.css";
import {Icon} from "@iconify/react";

const Forgotpass = () => {
    return (
        <div className='forgotpass_page'>
                <form className='forgotpass'>
                <img src="/assets/logo.png" alt='' className='forgotpass_logo'/>             
                <h1 className="forgotpass_Header">Welcome to Smart Locker</h1>
                <p className="forgotpass_Content">Enter the Mobile number</p>                
                <div className='forgotpass_Input'>
                <input
                className='forgotpass_Inputfields'
                placeholder='Mobile Number'
                name='mobile'
                type="number"
                >
                </input>
                <label htmlFor='username' className='forgotpass_label_Icon'>
                <Icon icon="entypo:old-mobile" />
                </label>
                </div>
                <button type="submit"
                className="forgotpass_Submit">Send OTP</button>
                <p className='forgotpass_register_Switch'>Dont have a Account?<a href="/Register">Register</a></p>
                </form>
        </div>
    )
}

export default Forgotpass;
