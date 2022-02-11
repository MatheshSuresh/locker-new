import { useState, useEffect } from 'react';
import "./forgotpass.css";
import { Icon } from "@iconify/react";
import axios from 'axios';

const Forgotpass = () => {
    const [email, setEmail] = useState(null);
    const [otpinput, setOtpinput] = useState(false);
    const [otp, setOtp] = useState(null);
    const handleChange = async (e) => {
        setEmail(e.target.value)
    }
    const handleChangeotp = (e) => {
        setOtp(e.target.value)
    }
    const sendopt = async () => {
        var user = await axios.get(`http://localhost:3001/user/check`).then((res) => { return res.data })
        var checkuser = await user.filter((data) => { return data.email === email })
        if (checkuser.length !== 0) {
            var val = Math.floor(1000 + Math.random() * 9000);
            alert(`Your Otp : ${val}`)
            sessionStorage.setItem("otp", val)
            sessionStorage.setItem("email", checkuser[0].email)
            setOtpinput(true)
            setOtp()
        }
    }
    const checkotp = () => {
        var otplocal = sessionStorage.getItem("otp")
        if (otp === otplocal) {
            sessionStorage.removeItem("otp")
            window.location.replace("/newpass")
        } else {
            alert("Wrong Otp")
            window.location.reload()
        }
    }
    return (
        <div className='forgotpass_page'>
            <div className='forgotpass'>
                <img src="/assets/logo.png" alt='' className='forgotpass_logo' />
                <h1 className="forgotpass_Header">Welcome to Smart Locker</h1>
                {otpinput === true ? <p className="forgotpass_Content">Enter Otp</p> : <p className="forgotpass_Content">Enter the Email</p>}

                <div className='forgotpass_Input'>
                    {otpinput === true ? <input
                        className='forgotpass_Inputfields'
                        placeholder='Otp'
                        name='otp'
                        type="number"
                        onChange={handleChangeotp}
                    >
                    </input> : <input
                        className='forgotpass_Inputfields'
                        placeholder='Email Address'
                        name='email'
                        type="email"
                        onChange={handleChange}
                    >
                    </input>}
                    <label htmlFor='username' className='forgotpass_label_Icon'>
                        <Icon icon="entypo:old-mobile" />
                    </label>
                </div>
                {otpinput === true ? <button type="submit"
                    className="forgotpass_Submit" onClick={checkotp}>Submit</button> : <button type="submit"
                        className="forgotpass_Submit" onClick={sendopt}>Send OTP</button>}

                <p className='forgotpass_register_Switch'>Dont have a Account?<a href="/Register">Register</a></p>
            </div>
        </div>
    )
}

export default Forgotpass;
