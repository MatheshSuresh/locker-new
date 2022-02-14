import { useState, useEffect } from 'react';
import axios from 'axios';
import "./dashboard.css";
import { Icon } from "@iconify/react";
import Sidebar from '../../components/sidebar';



const Dashboard = () => {
    const [Dashboarddata, setDashboarddata] = useState("");
    const [lock, setLock] = useState("unlock");;
    const [lockerInfo, setLockerInfo] = useState([]);
    const [DashboardInfo, setDashboardInfo] = useState(Dashboarddata);
    const [searchText, setSearchText] = useState('');
    const [modal, setModal] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const [lockeruserdata, setlockerUserdata] = useState([]);


    const getInfo = async () => {
        try {
            var useremail = sessionStorage.getItem("useremail")
            var user = await axios.get(`http://localhost:3001/user/check`).then((res) => { return res.data })
            const { data } = await axios.get('http://localhost:3001/locker/lockerdata');
            var checkuser = user.filter((res) => { return res.email === useremail })
            if (checkuser[0].role === "user") {
                var mydata = await data.filter((response) => { return response.user === useremail })
                if (mydata.length !== 0) {
                    setDashboarddata(mydata);
                }
            } else {
                setDashboarddata(data);
            }
            setUserdata(user)
        } catch (err) {
            console.log(err)
        }
        setTimeout(() => {
            getInfo()
        }, 2000)

    }

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        setDashboardInfo(Dashboarddata);
    }, [Dashboarddata]);

    useEffect(() => {
        if (searchText === '') {
            return;
        } else {
            setDashboardInfo(() =>
                Dashboarddata.filter((item) =>
                    item.name.toLowerCase().match(searchText.toLowerCase())));
        }
    }, [searchText, Dashboarddata]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
        if (!e.target.value.length > 0) {
            setDashboardInfo(Dashboarddata);
        }
    }

    const handleUnlock = async (values) => {
        await axios.post("http://localhost:3001/locker/unlock", values)
        var datanew = await axios.post("http://localhost:3001/locker/unlockupdate", values)
        if (datanew !== null) {
            setLock("unlock");
            console.log(lock);
            getInfo();
        }
    }

    const setLockerInfodata = async (e) => {
        setLockerInfo(e)
        setModal(false)
        if (e.user === "null") {
            setModal(true)
        }
        var mydata = await userdata.filter((data) => { return data.email === e.user })
        setlockerUserdata(mydata)
    }
    const addlocker = async () => {
        var user = document.getElementById("user").value
        var data = {
            user: user,
            name: lockerInfo.name
        }
        var datanew = await axios.post("http://localhost:3001/locker/updateuser", data)
        console.log(datanew)
        if (datanew !== null) {
            setModal(false)
            window.location.reload()
        }

    }
    const removeuser = async () => {
        var data = {
            user: "null",
            name: lockerInfo.name
        }
        var datanew = await axios.post("http://localhost:3001/locker/updateuser", data)
        console.log(datanew)
        if (datanew !== null) {
            window.location.reload()
        }
    }
    return (

        <div className='dashboard'>
            <Sidebar className="dashboard_Sidebar" />
            <div className="dashboard_Rightbar">
                <div className="dashboard_RightbarTop">
                    <Icon icon="iwwa:dashboard" className='dashboard_Icon' />
                    <h1 className='dashboard_Heading'>Dashboard</h1>
                    <form>
                        <div className='dashboard_Input'>
                            <input
                                className='dashboard_Inputfields'
                                placeholder='Search'
                                name='search'
                                type="text"
                                value={searchText}
                                onChange={handleChange}
                            >
                            </input>
                            <label htmlFor='username' className='dashboard_label_Icon'>
                                <Icon icon="charm:search" />
                            </label>
                        </div>
                    </form>
                </div>

                {modal === true ?
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Add user</h5>
                                    <div className='mt-5' >
                                        <select className='form-control' style={{ border: "2px solid black" }} id='user' name="user" onChange={handleChange} >
                                            <option value="null">Select User</option>
                                            {userdata.map((data, index) => (
                                                <option className="adminctrl_option" value={data.email} key={index}>{data.email}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className='mt-3'>
                                        <button className='adminCtrl_lockerInfo_Button' onClick={addlocker}>Add user</button>
                                        <button className='adminCtrl_lockerInfo_Button m-5' onClick={() => setModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="dashboard_RightbarBottom">
                        <div className="dashboard_lockerContainer">
                            {(() => {
                                if (DashboardInfo.length !== 0) {
                                    return (
                                        <>
                                            {DashboardInfo.map((values, key) => {
                                                return <button className='dashboard_detailget' data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                    onClick={() => setLockerInfodata(values)}>
                                                    <div key={key} className='dashboard_lockerBox'>
                                                        <Icon icon="bx:bxs-lock" className='dashboard_lockerIcon' id={values.status} />
                                                        <h5>{values.name}</h5>
                                                        <p>{values.status}</p>
                                                        {values.status === "lock" ?
                                                            <button type='button'
                                                                className='dashboard_unlockButton'
                                                                onClick={() => handleUnlock(values)}><Icon icon="mdi:toggle-switch-off" className='dashboard_unlockButton_logo' /></button> : ""}
                                                    </div>
                                                </button >
                                            })}
                                        </>
                                    )
                                }
                            })()}
                        </div>


                        <div className='dashboard_lockerInfo'>
                            <h3>Occupied locker details</h3>
                            <div className="dashboard_lockerInfoTop">
                                <Icon icon="bx:bxs-lock" className='dashboard_lockerImg' id={lockerInfo.status} />
                                <div className="dashboard_locker_details">
                                    <p>{lockerInfo.name}</p>
                                    <p>{lockerInfo.status}</p>
                                </div>
                            </div>
                            {lockeruserdata.length !== 0 ?
                                <div className="dashboard_lockerInfo_details">
                                    <img className="dashboard_profileImg" src="./assets/profile.png" alt="" />
                                    <div className='dashboard_lockerInfo_detailsdiv'>
                                        <h6>First name</h6>
                                        <p>{lockeruserdata[0].username}</p>
                                    </div >
                                    <div className='dashboard_lockerInfo_detailsdiv'>
                                        <h6>Email</h6>
                                        <p>{lockeruserdata[0].email}</p>
                                    </div>
                                    {/* <div className='dashboard_lockerInfo_detailsdiv'>
                                <h6>Phone Number</h6>
                                <p></p>
                            </div>
                            <div className='dashboard_lockerInfo_detailsdiv'>
                                <h6>IMEI Number</h6>
                                <p></p>
                            </div>
                            <div className='dashboard_lockerInfo_detailsdiv'>
                                <h6>Login Time </h6>
                                <p></p>
                            </div> */}
                                    <div className='dashboard_lockerInfo_detailsdiv'>
                                        <button className='adminCtrl_lockerInfo_Button' onClick={removeuser}>Release User</button>
                                    </div>
                                </div> : null}

                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default Dashboard;
