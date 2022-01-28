import React from 'react';
import "./newpass.css";
import {Icon} from "@iconify/react";

const Newpass = () => {
    return (
        <div className='forgatpass_page'>
                <form className='forgatpass'>
                <img src="/assets/logo.png" alt='' className='forgatpass_logo'/>             
                <h1 className="forgatpass_Header">Welocome to Smart Locker</h1>
                <p className="forgatpass_Content">Enter the New Password</p>                
                <div className='forgatpass_Input'>
                <input
                className='forgatpass_Inputfields'
                placeholder='New Password'
                name='password'
                type="password"
                />
                <label htmlFor='username' className='forgatpass_label_Icon'>
                <Icon icon="codicon:key" />
                </label>
                </div>
                <div className='forgatpass_Input'>
                <input
                className='forgatpass_Inputfields'
                placeholder='Re-Enter Password'
                name='password2'
                type="password"
                />
                <label htmlFor='username' className='forgatpass_label_Icon'>
                <Icon icon="codicon:key" />
                </label>
                </div>
                <button type="submit"
                className="forgatpass_Submit">Create Password</button>
                </form>
        </div>
    )
}

export default Newpass;
