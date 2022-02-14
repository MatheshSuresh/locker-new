import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import "./adminctrl.css"
import Sidebar from '../../components/sidebar';
import useAdminCtrlForm from "./useAdminCtrlForm";
import validateInfo from './validate';
import axios from "axios";

const AdminCtrl = () => {
    const [locker, setLocker] = useState("");
    const [Dashboarddata, setDashboarddata] = useState("");
    const [userdata, setUserdata] = useState([]);
    const [DashboardInfo, setDashboardInfo] = useState(Dashboarddata);
    const { values, handleChange, handleSubmit, errors } = useAdminCtrlForm(validateInfo);


    const getInfo = async () => {
        try {
            const { data } = await axios.get('https://smartlockers.herokuapp.com/locker/lockerdata');
            const users = await axios.get('https://smartlockers.herokuapp.com/user/check');
            setUserdata(users.data)
            setDashboarddata(data);
        } catch (err) {
            console.log(err);
        }
    }


    const unlock = async () => {
        await axios.post("https://smartlockers.herokuapp.com/locker/unlock", DashboardInfo[0]);
    }

    const unlockAll = async () => {
        for (let i = 0; i < Dashboarddata.length; i++) {
            await axios.post("https://smartlockers.herokuapp.com/locker/unlock", Dashboarddata[i]);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    const addlocker = async () => {
        var lockername = document.getElementById("lockername").value
        var status = document.getElementById("status").value
        var subtopic = document.getElementById("subtopic").value
        var pubtopic = document.getElementById("pubtopic").value
        var key = document.getElementById("key").value
        var user = document.getElementById("user").value
        var data = {
            name: lockername,
            status: status,
            subscribe_topic: subtopic,
            publish_topic: pubtopic,
            key: key,
            user: user
        }
        var addlockerdata = await axios.post(`https://smartlockers.herokuapp.com/locker/insertlocker`, data).then((res) => { return res.data })
        if(addlockerdata !==null){
            window.location.reload()
        }
    }
    return (
        <div className='adminCtrl'>
            <Sidebar className="adminCtrl_Sidebar" />
            <div className="adminCtrl_Rightbar">
                <div className="adminCtrl_RightbarTop">
                    <Icon icon="carbon:user-settings" className='adminCtrl_Icon' />
                    <h1 className='adminCtrl_Heading'>Super Admin</h1>
                    <form>
                        <div className='adminCtrl_search_Input'>
                            <input
                                className='adminCtrl_search_Inputfields'
                                placeholder='Search'
                                name='username'
                                type="text"
                            >
                            </input>
                        </div>
                    </form>
                </div>
                <div className="adminCtrl_RightbarBottom">
                    <div className="adminCtrl_RightbarBottomleft" >
                        <div className="adminCtrl_lockerContainer">
                            <div className='adminCtrl_lockerContainertop'>
                                <h1>Employee List</h1>
                                <form>
                                    <div className='adminCtrl_lockerContainer2_search_Input'>
                                        <input
                                            className='adminCtrl_lockerContainer2_search_Inputfields'
                                            placeholder='Search'
                                            name='username'
                                            type="text"
                                        >
                                        </input>
                                        <label htmlFor='username' className='adminCtrl_lockerContainer2_search_Icon'>
                                            <Icon icon="charm:search" />
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <hr />
                            <div className='adminctrl_databoard'>
                                <div className='adminctrl_databoard_top'>
                                    <label className="adminctrl_label">Open Selected Locker</label>
                                    <select onChange={(e) => {
                                        const lock = e.target.value;
                                        setLocker(lock);
                                        console.log(lock);
                                        setDashboardInfo(
                                            Dashboarddata.filter((item) =>
                                                item.name.toLowerCase().match(locker.toLowerCase())));
                                        console.log(DashboardInfo[0]);
                                    }}>
                                        {(() => {
                                            if (Dashboarddata.length !== 0) {
                                                return (
                                                    <>
                                                        {Dashboarddata.map((values, key) => {
                                                            return <option className="adminctrl_option" key={key} value={values.name}>{values.name}</option>
                                                        })}
                                                    </>
                                                )
                                            }
                                        })()}
                                    </select>
                                    <button className="adminctrl_Button" type='submit' onClick={unlock}>Open</button>
                                </div>
                                <br />
                                <div className='adminctrl_databoard_bottom'>
                                    <label className="adminctrl_label">Open All Locker</label>
                                    <button type="button" className="adminctrl_Button" onClick={unlockAll}>Open</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="adminCtrl_lockerInfoContainer">
                        <div className='adminCtrl_lockerInfo'>
                            <div className="adminCtrl_lockerInfotop">
                                <h3>Locker Occupancy</h3>
                                <div className='adminCtrl_occupied_lockers'>
                                    <div className="adminCtrl_occupied_lockers_circular" style={{ background: `conic-gradient(#39B54A ${80 * 3.6}deg,  #c6c6c6 ${80 * 3.6}deg)` }}>
                                        <div className='adminCtrl_occupied_lockers_value'>80%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='adminCtrl_lockerInfo2'>
                            <h3>Add Locker</h3>
                            <div className='adminCtrl_lockerInfo2_Form' >
                                <label htmlFor="">Locker Name</label>
                                <input
                                    name="name"
                                    id='lockername'
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.name}
                                    onChange={handleChange} />
                                {errors.name && <p>{errors.name}</p>}
                                <br />
                                <label htmlFor="">Status</label>
                                <input
                                    id='status'
                                    name="status"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.status}
                                    onChange={handleChange} />
                                {errors.status && <p>{errors.status}</p>}
                                <br />
                                <label htmlFor="">Subscribe Topic</label>
                                <input
                                    id='subtopic'
                                    name="subscribe_topic"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.subscribe_topic}
                                    onChange={handleChange} />
                                {errors.subscribe_topic && <p>{errors.subscribe_topic}</p>}
                                <br />
                                <label htmlFor="">Publish Topic</label>
                                <input
                                    id='pubtopic'
                                    name="publish-topic"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'

                                    onChange={handleChange} />
                                {errors.publish_topic && <p>{errors.publish_topic}</p>}
                                <br />
                                <label htmlFor="">Message</label>
                                <input
                                    id='key'
                                    name="key"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.key}
                                    onChange={handleChange} />
                                {errors.message && <p>{errors.message}</p>}
                                <br />
                                <label htmlFor="">Select User</label>
                                <select className='adminCtrl_lockerInfo_Input' id='user' name="user" onChange={handleChange} >
                                    <option value="null">Select User</option>
                                    {userdata.map((data, index) => (
                                        <option className="adminctrl_option" value={data.email} key={index}>{data.email}</option>
                                    ))}

                                </select>
                                <button className='adminCtrl_lockerInfo_Button' onClick={addlocker}>Add Locker</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCtrl;
