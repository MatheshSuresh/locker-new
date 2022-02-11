import React from 'react';
import "./newpass.css";
import { Icon } from "@iconify/react";
import axios from 'axios';

const Newpass = () => {
    const newpassword =async () => {
        var password = document.getElementById("password").value
        var reenterpassword = document.getElementById("reenterpassword").value
      
        if (password === reenterpassword) {
            var data={
                password:password,
                email:"john@gmail.com"
            }
            var newpassword = await axios.post(`http://localhost:3001/user/update`,data).then((res)=>{return res.data})
            if(newpassword !==null){
                window.location.replace("/")
            }
        } else {
            alert("Your Password Not Match..")
        }
    }
    return (
        <div className='forgatpass_page'>
            <div className='forgatpass'>
                <img src="/assets/logo.png" alt='' className='forgatpass_logo' />
                <h1 className="forgatpass_Header">Welocome to Smart Locker</h1>
                <p className="forgatpass_Content">Enter the New Password</p>
                <div className='forgatpass_Input'>
                    <input
                        className='forgatpass_Inputfields'
                        placeholder='New Password'
                        name='password'
                        type="password"
                        id='password'
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
                        id='reenterpassword'
                    />
                    <label htmlFor='username' className='forgatpass_label_Icon'>
                        <Icon icon="codicon:key" />
                    </label>
                </div>
                <button type="submit"
                    className="forgatpass_Submit" onClick={newpassword}>Create Password</button>
            </div>
        </div>
    )
}

export default Newpass;
