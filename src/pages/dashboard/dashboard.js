import { useState, useEffect } from 'react';
import axios from 'axios';
import "./dashboard.css";
import { Icon } from "@iconify/react";
import Sidebar from '../../components/sidebar';



const Dashboard = () => {
    const [Dashboarddata, setDashboarddata] = useState("");
    const [lock, setLock] = useState("unlock");;
    const [lockerInfo, setLockerInfo] = useState({});
    const [DashboardInfo, setDashboardInfo] = useState(Dashboarddata);
    const [searchText, setSearchText] = useState('');
    const getInfo = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/locker/lockerdata');
            setDashboarddata(data);
        } catch (err) {
            console.log(err)
        }
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
                <div className="dashboard_RightbarBottom">
                    <div className="dashboard_lockerContainer">
                        {(() => {
                            if (DashboardInfo.length !== 0) {
                                return (
                                    <>
                                        {DashboardInfo.map((values, key) => {
                                            return <button className='dashboard_detailget'
                                                onClick={() => setLockerInfo(values)}>
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
                        <div className="dashboard_lockerInfo_details">
                            <img className="dashboard_profileImg" src="./assets/profile.png" alt="" />
                            <div className='dashboard_lockerInfo_detailsdiv'>
                                <h6>First name</h6>
                                <p></p>
                            </div >
                            <div className='dashboard_lockerInfo_detailsdiv'>
                                <h6>Email</h6>
                                <p></p>
                            </div>
                            <div className='dashboard_lockerInfo_detailsdiv'>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
