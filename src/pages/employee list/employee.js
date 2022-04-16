import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import "./employee.css"
import Sidebar from '../../components/sidebar';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Employee = () => {

    const [Employee, setEmployee] = useState('')
    const [activePage, setactivePage] = useState(1);


    useEffect(async () => {
        const user = await axios.get(`https://smartlockers.herokuapp.com/user/viewall`).then((res) => { return res.data })
        setEmployee(user)
    }, [])


    const indexOfLastPost = activePage * 20;
    const indexOfFirstPost = indexOfLastPost - 20;
    const currentPosts = Employee.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(Employee.length / 20); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className='employee'>
            <Sidebar className="employee_Sidebar" />
            <div className="employee_Rightbar">
                <div className="employee_RightbarTop">
                    <Icon icon="carbon:user-profile" className='employee_Icon' />
                    <h1 className='employee_Heading'>Employee List</h1>
                    <form>
                        <div className='employee_search_Input'>
                            <input
                                className='employee_search_Inputfields'
                                placeholder='Search'
                                name='username'
                                type="text"
                            >
                            </input>
                            <label htmlFor='username' className='employee_search_Icon'>
                                <Icon icon="charm:search" />
                            </label>
                        </div>
                    </form>
                </div>
                <div className="employee_RightbarBottom">
                    <div className="employee_RightbarBottomleft" >
                        <div className="employee_lockerContainer">
                            <div className='employee_lockerContainertop'>
                                <h1>Employee List</h1>
                                <form>
                                    <div className='employee_lockerContainer2_search_Input'>
                                        <input
                                            className='employee_lockerContainer2_search_Inputfields'
                                            placeholder='Search'
                                            name='username'
                                            type="text"
                                        >
                                        </input>
                                        <label htmlFor='username' className='employee_lockerContainer2_search_Icon'>
                                            <Icon icon="charm:search" />
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <hr />

                            {/* {
                        Employee.map((values, key) => {
                            return <>
                                <Row>
                                    <Col>{values.email}</Col>
                                    <Col>{values.username}</Col>
                                </Row>
                            </>
                    })} */}
                            <table className="tablelist m-5">
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                                {currentPosts.length !== 0 ?

                                    currentPosts.map((values, key) => {
                                        return <>
                                            <tr>
                                                <td>{values.username}</td>
                                                <td>{values.email}</td>
                                            </tr>
                                        </>
                                    })
                                    : null}
                            </table>
                            <div className='row m-5'>

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
                    <div className='employee_lockerInfo'>
                        <div className="employee_lockerInfotop">
                            <h3>Add Employee</h3>
                            <img className="employee_profileImg" src="./assets/profile.png" alt="" />
                        </div>
                        <form className='employee_Form'>
                            <label>User Name</label><br />
                            <input type="text" className='employee_Input'></input>
                            <br />
                            <label>Password</label><br />
                            <input type="password" className='employee_Input'></input><br />
                            <label>Confirm Password</label><br />
                            <input type="password" className='employee_Input'></input><br />
                            <label>User Profile</label><br />
                            <input type="type" className='employee_Input'></input><br />
                            <button className='employee_input_Button'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee;
