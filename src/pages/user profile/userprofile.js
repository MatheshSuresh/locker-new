import React from 'react';
import {Icon} from "@iconify/react";
import "./userprofile.css"
import Sidebar from '../../components/sidebar';

const Userprofile = () => {
    return (
        <div className='userprofile'>
        <Sidebar className="userprofile_Sidebar"/>
        <div className="userprofile_Rightbar">
            <div className="userprofile_RightbarTop">
                <Icon icon="si-glyph:gear-1" className='userprofile_Icon'/>
                <h1 className='userprofile_Heading'>User Profile</h1>
                <form>
                    <div className='userprofile_search_Input'>
                    <input
                    className='userprofile_search_Inputfields'
                    placeholder='Search'
                    name='username'
                    type="text"
                    >
                    </input>
                    <label htmlFor='username' className='userprofile_search_Icon'>
                    <Icon icon="charm:search" />
                    </label>
                    </div>
                </form>
            </div>
            <div className="userprofile_RightbarBottom">
                <div className="userprofile_RightbarBottomleft" >
                <div className="userprofile_lockerContainer">
                <div className='userprofile_lockerContainertop'>
                <h1 className='userprofile_lockerContainer_heading'>User list</h1>
                <form>
                    <div className='userprofile_lockerContainer2_search_Input'>
                    <input
                    className='userprofile_lockerContainer2_search_Inputfields'
                    placeholder='Search'
                    name='username'
                    type="text"
                    >
                    </input>
                    <label htmlFor='username' className='userprofile_lockerContainer2_search_Icon'>
                    <Icon icon="charm:search" />
                    </label>
                    </div>
                </form>
                </div>
                <hr />
                </div>
                </div>
            <div className='userprofile_lockerInfo'>
                <div className="userprofile_lockerInfotop">
                <h3>Add User</h3>
                <img className = "userprofile_profileImg" src="./assets/profile.png" alt="" />
                </div>
                  <form className='userprofile_Form'>
                  <label>User Name</label><br />
                  <input type="text" className='userprofile_Input'></input>
                  <br />
                  <label>Password</label><br />
                  <input type="password" className='userprofile_Input'></input><br />
                  <label>Confirm Password</label><br />
                  <input type="password" className='userprofile_Input'></input><br />
                  <label>User Profile</label><br />
                  <input type="type"className='userprofile_Input'></input><br />
                  <button className='userprofile_input_Button'>Submit</button>
                  </form>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Userprofile;
