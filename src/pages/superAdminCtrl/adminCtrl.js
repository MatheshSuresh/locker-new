import React from 'react';
import {Icon} from "@iconify/react";
import "./adminctrl.css"
import Sidebar from '../../components/sidebar';

const AdminCtrl = () => {
    return (
        <div className='adminCtrl'>
        <Sidebar className="adminCtrl_Sidebar"/>
        <div className="adminCtrl_Rightbar">
            <div className="adminCtrl_RightbarTop">
                <Icon icon="carbon:user-settings" className='adminCtrl_Icon'/>
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
                    <label htmlFor='username' className='adminCtrl_search_Icon'>
                    <Icon icon="charm:search" />
                    </label>
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
                </div>               
                </div>
            <div className="adminCtrl_lockerInfoContainer">
            <div className='adminCtrl_lockerInfo'>
                <div className="adminCtrl_lockerInfotop">
                <h3>Locker Occupancy</h3>
                <div className='adminCtrl_occupied_lockers'>
                    <div className="adminCtrl_occupied_lockers_circular"  style={{background:`conic-gradient(#39B54A ${80*3.6}deg,  #c6c6c6 ${80*3.6}deg)`}}>
                        <div className='adminCtrl_occupied_lockers_value'>80%</div>
                    </div>
                </div>
                </div>                
            </div>
            <div className='adminCtrl_lockerInfo2'>
                <h3>Add Locker</h3>
                <form className='adminCtrl_lockerInfo2_Form'>
                    <label htmlFor="">Locker Name</label>
                    <input type="text" className='adminCtrl_lockerInfo_Input' />
                    <br />
                    <label htmlFor="">Status</label>
                    <input type="text" className='adminCtrl_lockerInfo_Input'/>
                    <br />
                    <label htmlFor="">Topic</label>
                    <input type="text" className='adminCtrl_lockerInfo_Input'/>
                    <br />
                    <label htmlFor="">Message</label>
                    <input type="text" className='adminCtrl_lockerInfo_Input'/>
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
