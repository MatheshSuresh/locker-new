import React from 'react';
import "./sidebar.css";
import { SidebarData } from './sidebarData';
import {useNavigate} from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const Signout =()=>{
        sessionStorage.clear();
        navigate("/");
    }
    return (
        <div className='sidebar'>
            <ul className='sidebarList'>
             <div className='sidebarLogodiv' >
                 <img src="/assets/logo.png" className='sidebarLogo' alt="" />
                 <h1 className='sidebarLogotext'>Smart<br/>Locker</h1></div>
                 <div className="sidebarline">
             {SidebarData.map((val,key)=>{
                 return<li key={key} 
                        className='row'
                        id={window.location.pathname === val.link ? "active" : ""}
                        onClick={()=>{window.location.pathname= val.link}}>
                     <div id="icon">{val.icon}</div>
                     <div id="title">{val.title}</div>
                     </li>
             })}
             </div>
             <button className="sidebar_Signout" onClick={Signout}> Sign out</button>
            </ul>
        </div>
    )
}

export default Sidebar
