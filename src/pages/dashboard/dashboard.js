import { useState, useEffect } from 'react';
import axios from 'axios';
import "./dashboard.css";
import { Icon } from "@iconify/react";
import Sidebar from '../../components/sidebar';





const Dashboard = () => {
    const [Dashboarddata, setDashboarddata] = useState([]);
    const [lock, setLock] = useState("unlock");;
    const [lockerInfo, setLockerInfo] = useState([]);
    const [DashboardInfo, setDashboardInfo] = useState(Dashboarddata);
    const [searchText, setSearchText] = useState('');
    const [modal, setModal] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const [lockeruserdata, setlockerUserdata] = useState([]);
    const [activePage, setactivePage] = useState(1);
    const [open, setopen] = useState('Close');
    const [lockStatus, setlockStatus] = useState([]);
    const [lockList, setlockList] = useState([]);
    const pageNumbers = [];


    const getInfo = async () => {
        try {
            var useremail = sessionStorage.getItem("useremail")
            var user = await axios.get(`http://3.239.93.89:3001/user/check`).then((res) => { return res.data })
            const { data } = await axios.get('http://3.239.93.89:3001/locker/lockerdata');
            // console.log(data);//124.123.67.202:8084/
            var lockstatus1 = await axios.get(`http://3.239.93.89:3001/machineStatus/?ip=124.123.67.202&port=8084&type=status&address=1`).then((res) => { return res.data })
            var lockstatus2 = await axios.get(`http://3.239.93.89:3001/openLock/?ip=124.123.67.202&port=8084&type=status&address=2`).then((res) => { return res.data })

            var lockstatus = lockstatus1.concat(lockstatus2)

            setlockStatus(lockstatus)

            var result = lockStatus.filter(({ locker_address: id1 }) => data.some(({ locker_address: id2 }) => { return id1 === id2 }))
            var test = result.concat(data)
            if (lockstatus.length !== 0) {
                var finalarray = []
                for (var i = 0; i < lockstatus.length; i++) {
                    for (var j = 0; j < test.length; j++) {
                        if (lockstatus[i].locker_address === Number(test[j].locker_address)) {
                            finalarray.push(lockstatus[i])
                        }
                    }
                }

            }
            console.log(finalarray);
            var filterData = []
             data.forEach((e)=>{
                finalarray.forEach((f)=>{
                    if(e.locker_address == f.locker_address){
                        filterData.push(Object.assign({},e,f))
                    }
                })
            })
            console.log(filterData);
            setlockStatus(filterData)
            var checkuser = user.filter((res) => { return res.email === useremail })
            if (checkuser[0].role === "user") {
                var mydata = await data.filter((response) => { return response.user === useremail })
                if (mydata.length !== 0) {
                    console.log(mydata);
                    setDashboarddata(mydata);
                }
            } else {
                var newdata = data.sort(function (a, b) {
                    return a.name.split(" ")[1] - b.name.split(" ")[1]
                });


                setDashboarddata(newdata);
            }
            setUserdata(user)
        } catch (err) {
            console.log(err)
        }

    
     
        setTimeout(() => {
            getInfo()
        }, 3500)

    }
    const indexOfLastPost = activePage * 12;
    const indexOfFirstPost = indexOfLastPost - 12;
    const currentPosts = lockStatus.slice(indexOfFirstPost, indexOfLastPost);
    // setlockList(currentPosts)
    for (let i = 1; i <= Math.ceil(lockStatus.length / 12); i++) {
        pageNumbers.push(i);
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

    const handleUnlock = async (values, key) => {
        // let data = values
        // console.log(data);
        // let locker = data.name.split(' ',2)
        // console.log(locker[1]);
        console.log(values, key);
        // console.log(key);
        // http://3.239.93.89:3001/machineStatus/?ip=124.123.67.202&port=8084&type=status&address=1
        let set = await axios.get(`http://3.239.93.89:3001/openLock/?ip=124.123.67.202&port=8084&type=operate&address=${values.locker_address}`);
        console.log(set);
        // set.data === 'OK'?setopen('opened'):setopen('close')

        // await axios.post("http://3.239.93.89:3001/locker/unlock", values)
        var datanew = await axios.post("http://3.239.93.89:3001/locker/unlockupdate", values)
        // var datanew = await axios.post("http://3.239.93.89:3001/locker/unlockupdate",  values)



        console.log(datanew);
        if (datanew !== null) {
            setLock("unlock");
            console.log(lock);
            // getInfo();
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
            name: lockerInfo.name,
            userstatus: "occupied",
        }
        var datanew = await axios.post("http://3.239.93.89:3001/locker/updateuser", data)
        console.log(datanew)
        if (datanew !== null) {
            setModal(false)
            window.location.reload()
        }

    }
    const removeuser = async () => {
        var data = {
            user: "null",
            name: lockerInfo.name,
            userstatus: "available",
        }
        var datanew = await axios.post("http://3.239.93.89:3001/locker/updateuser", data)
        console.log(datanew)
        if (datanew !== null) {
            window.location.reload()
        }
    }
    const reserveduser = async () => {
        var data = {
            user: "null",
            name: lockerInfo.name,
            userstatus: "reserved",
        }
        var datanew = await axios.post("http://3.239.93.89:3001/locker/updateuser", data)
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
                                        <button className='adminCtrl_lockerInfo_Button m-2' onClick={reserveduser}>Reserved  user</button>
                                        <button className='adminCtrl_lockerInfo_Button' onClick={addlocker}>Add user</button>
                                        <button className='adminCtrl_lockerInfo_Button m-2' onClick={() => setModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="dashboard_RightbarBottom">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="dashboard_lockerContainer">
                                {/* {(() => {
                                if (currentPosts.length !== 0) {
                                    return (
                                        <>
                                            {currentPosts.map((values, key) => {
                                                return <button className='dashboard_detailget'  key={key} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                    onClick={() => setLockerInfodata(values)}>
                                                    <div className='dashboard_lockerBox'>
                                                       {values.status === 'close'?<Icon icon="bx:bxs-lock" className='dashboard_lockerIcon' id={values.status} />:
                                                        <Icon icon="bxs:lock-open" className='dashboard_lockerIcon' id={values.status} />
                                                       
                                                       } 
                                                       
                                                        <h5>{values.name}</h5>
                                                        

                                                        <p>{values.status}</p>
                                                       
                                                        <button type='button'
                                                                className='openbtnnew'
                                                                onClick={() => handleUnlock(values)}>Open</button>
                                                    </div>
                                                </button >
                                            })}



                                        </>

                                    )
                                }
                            })()}  */}


                                {(() => {
                                    if (currentPosts.length !== 0) {
                                        return (
                                            <>
                                                {currentPosts.map((values, key) => {

                                                    return <button className='dashboard_detailget' key={key} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                        onClick={() => setLockerInfodata(values)}>
                                                        <div className={values.status === 1 ? 'dashboard_lockerBox' : 'dashboard_lockerBox dashboard_lockerBox_open'}>
                                                            {values.status === 1 ? <Icon icon="fa-solid:lock" className='dashboard_lockerIcon' id={values} /> :
                                                                <Icon style={{ transform: 'scaleX(-1)', color: 'red' }} icon="fa-solid:lock-open" data-flip="horizontal" className='dashboard_lockerIcon' id={values} />

                                                            }

                                                            <h5>{`${values.name}`}</h5>



                                                            <p style={{ color: 'white' }} key={key}>{values.status === 1 ?
                                                                `Closed` :
                                                                'Opened'}</p>

                                                            {values.status === 1 ? <button type='button'
                                                                className='openbtnnew'
                                                                onClick={() => handleUnlock(values, values.id)}>Open</button> : null}
                                                        </div>
                                                    </button >
                                                })}



                                            </>

                                        )
                                    }
                                })()}



                                {/* <div>
                                {lockStatus.map((values, key) => {
                                  return  <p style={{color:'white'}} key={key}>{values === 1 ?
                                    `${key+1} Closed`:
                                    'Opened'}</p>
                                })

                                }

                                </div>
                  */}



                            </div>
                            <div style={{ margin: '0 0 0 120px' }}>
                                <div className='row'>

                                    <ul className='pagination'>
                                        {pageNumbers.map(number => (
                                            <li key={number} className={`page-item ${activePage === number ? "active" : ""}`} style={{ cursor: "pointer" }}>
                                                <span onClick={() => setactivePage(number)} className='page-link'>
                                                    {number}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='dashboard_lockerInfo'>
                            <h3>Occupied locker details</h3>
                           {/*  */}
                            {lockeruserdata.length !== 0 ?
                                <>
                                <div className="dashboard_lockerInfoTop">
                                {/* <Icon icon="bx:bxs-lock" className='dashboard_lockerImg' id={lockerInfo.status} /> */}
                                {lockerInfo.status === 1 ? <Icon icon="fa-solid:lock" className='dashboard_lockerIcon dashboard_lockerImg'   id={lockerInfo.status}/> :
                                                                <Icon style={{ transform: 'scaleX(-1)', color: 'red' }} icon="fa-solid:lock-open" data-flip="horizontal" className='dashboard_lockerIcon dashboard_lockerImg'  id={lockerInfo.status} />

                                                            }
                                <div className="dashboard_locker_details">
                                    <p style={{marginBottom:"0"}}>{lockerInfo.name}</p>
                                    <p style={{marginBottom:"0"}}>{lockerInfo.status===0?'opened':'closed'}</p>
                                </div>
                                </div>
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
                                </div> </>: null}

                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default Dashboard;
