import {useState, useEffect} from 'react';
import {Icon} from "@iconify/react";
import Sidebar from '../../components/sidebar';
import "./reports.css";
import axios from "axios";

const Reports = () => {
    const [Dashboarddata,setDashboarddata]=useState(""); 
    const [DashboardInfo,setDashboardInfo]=useState(Dashboarddata);
    const getInfo = async () =>{
        try{
            const {data} = await axios.get('http://localhost:3001/locker/lockerdata');
            setDashboarddata(data);
          }catch(err){
              console.log(err)
          }
    }

    useEffect(()=>{
        getInfo();
    },[]);

    useEffect(()=>{
        setDashboardInfo(Dashboarddata);
        console.log(Dashboarddata);
        if(Dashboarddata.length!==0){    
        setDashboardInfo(()=>
        Dashboarddata.filter((item)=>
        item.status.match("locked")));
        }
    });

  
    return (
        <div className='reports'>
        <Sidebar className="reports_Sidebar"/>
        <div className="reports_Rightbar">
            <div className="reports_RightbarTop">
                <Icon icon="iconoir:reports" className='reports_Icon'/>
                <h1 className='reports_Heading'>Reports</h1>
                <form>
                <div className='reports_search_Input'>
                <input
                className='reports_search_Inputfields'
                placeholder='Search'
                name='username'
                type="text"
                >
                </input>
                <label htmlFor='username' className='reports_search_Icon'>
                <Icon icon="charm:search" />
                </label>
                </div>
                </form>
            </div>
            <div className="reports_RightbarBottom">
                <div className="reports_RightbarBottomleft" >
                <div className="reports_lockerContainer">
                <h3>Report Generator</h3>
                <hr />
                <form className="reports_form">
                    <label htmlFor="" className="reports_Input_label">From -</label>
                    <input type="date" className="reports_Input" />
                    <label htmlFor="" className="reports_Input_label">To -</label>
                    <input type="date" className="reports_Input" />
                    <label htmlFor="" className="reports_Input_label">Emp Id -</label>
                    <input type="text" className="reports_Input" />
                    <label htmlFor="" className="reports_Input_label">Locker No -</label>
                    <input type="text" className="reports_Input" />
                </form>
                </div>
                <div className="reports_lockerContainer2">
                <div className='reports_lockerContainer2top'>
                <h1 className='reports_lockerContainer_heading2'>Employee list</h1>
                <form>
                <div className='reports_lockerContainer2_search_Input'>
                <input
                className='reports_lockerContainer2_search_Inputfields'
                placeholder='Search'
                name='username'
                type="text"
                >
                </input>
                <label htmlFor='username' className='reports_lockerContainer2_search_Icon'>
                <Icon icon="charm:search" />
                </label>
                </div>
                </form>
                </div>
                <hr />
                </div>
                </div>
            <div className='reports_lockerInfo'>
                <h3>Locker Occupied</h3>
                <div className='reports_occupied_lockers'>
                    <div className="reports_occupied_lockers_circular"  style={{background:`conic-gradient(#39B54A ${80*3.6}deg,  #c6c6c6 ${80*3.6}deg)`}}>
                        <div className='reports_occupied_lockers_value'>80%</div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Reports;
