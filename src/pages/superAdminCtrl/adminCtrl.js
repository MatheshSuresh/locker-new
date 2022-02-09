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
    const [DashboardInfo, setDashboardInfo] = useState(Dashboarddata);
    const { values, handleChange, handleSubmit, errors } = useAdminCtrlForm(validateInfo);


    const getInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/locker/lockerdata');
            setDashboarddata(data);
        } catch (err) {
            console.log(err);
        }
    }


    const unlock = async () => {
        await axios.post("http://localhost:3001/locker/unlock", DashboardInfo[0]);
    }

    const unlockAll = async () => {
        for (let i = 0; i < Dashboarddata.length; i++) {
            await axios.post("http://localhost:3001/locker/unlock", Dashboarddata[i]);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

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
                            <form className='adminCtrl_lockerInfo2_Form' onSubmit={handleSubmit}>
                                <label htmlFor="">Locker Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.name}
                                    onChange={handleChange} />
                                {errors.name && <p>{errors.name}</p>}
                                <br />
                                <label htmlFor="">Status</label>
                                <input
                                    name="status"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.status}
                                    onChange={handleChange} />
                                {errors.status && <p>{errors.status}</p>}
                                <br />
                                <label htmlFor="">Subscribe Topic</label>
                                <input
                                    name="subscribe_topic"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.subscribe_topic}
                                    onChange={handleChange} />
                                {errors.subscribe_topic && <p>{errors.subscribe_topic}</p>}
                                <br />
                                <label htmlFor="">Publish Topic</label>
                                <input
                                    name="publish-topic"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.publish_topic}
                                    onChange={handleChange} />
                                {errors.publish_topic && <p>{errors.publish_topic}</p>}
                                <br />
                                <label htmlFor="">Message</label>
                                <input
                                    name="key"
                                    type="text"
                                    className='adminCtrl_lockerInfo_Input'
                                    value={values.key}
                                    onChange={handleChange} />
                                {errors.message && <p>{errors.message}</p>}
                                <br />
                                <button className='adminCtrl_lockerInfo_Button'>Add Locker</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCtrl;
