import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import Sidebar from '../../components/sidebar';
import "./reports.css";
import axios from "axios";
import moment from 'moment';

const Reports = () => {
    const [Dashboarddata, setDashboarddata] = useState("");
    const [DashboardInfo, setDashboardInfo] = useState(Dashboarddata);
    const [loginfo, setLogInfo] = useState([]);
    const [reportdata, setReportdata] = useState([]);
    const [reportpercentage, setReportpercentage] = useState([]);
    const [fromtime, setFromtime] = useState(null);
    const [totime, setTotime] = useState(null);

    const getInfo = async () => {
        try {
            const { data } = await axios.get('https://smartlockers.herokuapp.com/locker/lockerdata');
            const logdata = await axios.get('https://smartlockers.herokuapp.com/locker/logdata').then((res) => { return res.data })
            const totaldata = await axios.get('https://smartlockers.herokuapp.com/locker/occupied').then((res) => { return res.data })
            setDashboarddata(data);
            setLogInfo(logdata)
            console.log(data.length, totaldata.length)
            var perc = "";
            if (isNaN(data.length) || isNaN(totaldata.length)) {
                perc = " ";
            } else {
                perc = ((totaldata.length / data.length) * 100).toFixed(3);
            }
            setReportpercentage(Math.round(perc))
            // 


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getInfo();
    });

    // useEffect(() => {
    //     setDashboardInfo(Dashboarddata);
    //     if (Dashboarddata.length !== 0) {
    //         setDashboardInfo(() =>
    //             Dashboarddata.filter((item) =>
    //                 item.status.match("locked")));
    //     }
    // });



    const handlechangefromtime = (e) => {
        setFromtime(e.target.value)
    }
    const handlechangetotime = (e) => {
        setTotime(e.target.value)
        if (fromtime !== null) {
            console.log(fromtime, e.target.value, loginfo)
            var report = []
            for (var i = 0; i < loginfo.length; i++) {
                for (var j = 0; j < Dashboarddata.length; j++) {
                    if (loginfo[i].name === Dashboarddata[j].name) {
                        report.push({
                            logdata: loginfo[i],
                            lockerdata: Dashboarddata[j]
                        })
                    }
                }
            }
            var reportresult = []
            for (var a = 0; a < report.length; a++) {
                var date = report[a].logdata.time.split(",")[0]
                if (date >= fromtime && date <= e.target.value) {
                    reportresult.push(report[a])
                }
            }
            console.log(reportresult)
            if (reportresult.length !== 0) {
                setReportdata(reportresult)
            }
        }
    }
    const searchbtn = () => {
        setReportdata([])
        var empid = document.getElementById("empid").value
        var lockername = document.getElementById("lockername").value
        if (empid !== "") {
            var result = []
            for (var i = 0; i < reportdata.length; i++) {
                if (empid === reportdata[i].lockerdata.user) {
                    result.push(reportdata[i])
                }
            }
            setReportdata(result)
        } if (lockername !== "") {
            console.log(lockername)
            var resultnew = []
            for (var j = 0; j < reportdata.length; j++) {
                if (lockername === reportdata[j].lockerdata.name) {
                    resultnew.push(reportdata[j])
                }
            }
            setReportdata(resultnew)
        }
    }
    const clearallbtn = () => {
        window.location.reload()
        getInfo();
    }
    return (
        <div className='reports'>
            <Sidebar className="reports_Sidebar" />
            <div className="reports_Rightbar">
                <div className="reports_RightbarTop">
                    <Icon icon="iconoir:reports" className='reports_Icon' />
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
                            <div className="reports_form">
                                <label htmlFor="" className="reports_Input_label">From -</label>
                                <input type="date" className="reports_Input" name='from' onChange={(e) => handlechangefromtime(e)} />
                                <label htmlFor="" className="reports_Input_label">To -</label>
                                <input type="date" className="reports_Input" name='to' onChange={(e) => handlechangetotime(e)} />
                                <label htmlFor="" className="reports_Input_label">Emp Email -</label>
                                <input type="text" className="reports_Input" id='empid' />
                                <label htmlFor="" className="reports_Input_label">Locker No -</label>
                                <input type="text" className="reports_Input" id='lockername' />
                                <button className='adminCtrl_lockerInfo_Button' onClick={searchbtn}>Search</button>
                                <button className='adminCtrl_lockerInfo_Button' onClick={clearallbtn}>Clear All</button>
                            </div>
                        </div>
                        <div className="reports_lockerContainer2">
                            <div className='reports_lockerContainer2top'>
                                <h1 className='reports_lockerContainer_heading2'>Report list</h1>
                                {/* <form>
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
                                </form> */}

                            </div>
                            <hr />
                            <table class="reports_lockerContainer_heading2 table" style={{ color: "white",height:"200px" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">S. No</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Locker Name</th>
                                        <th scope="col">Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportdata.length !== 0 ? reportdata.map((data, index) => (
                                        <tr key={index}>
                                            <th >{index + 1}</th>
                                            <td>{data.lockerdata.user}</td>
                                            <td>{data.lockerdata.name}</td>
                                            <td>{data.logdata.time}</td>
                                        </tr>
                                    )) : null}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='reports_lockerInfo'>
                        <h3>Locker Occupied</h3>
                        <div className='reports_occupied_lockers'>
                            <div className="reports_occupied_lockers_circular" style={{ background: `conic-gradient(#ea3a3d ${reportpercentage * 3.6}deg,  #F9B959 ${reportpercentage * 3.6}deg)` }}>
                                <div className='reports_occupied_lockers_value'>{reportpercentage}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports;
