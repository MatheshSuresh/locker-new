import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import "./employee.css"
import Sidebar from '../../components/sidebar';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Employee = () => {

    const [Employee, setEmployee] = useState('')


    useEffect(async () => {
        const user = await axios.get(`https://smartlockers.herokuapp.com/user/viewall`).then((res) => { return res.data })
        setEmployee(user)
    }, [])


    console.log(Employee)
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
                            <table className="tablelist">
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                                {Employee.length !== 0 ?

                                    Employee.map((values, key) => {
                                        return <>
                                            <tr>
                                                <td>{values.username}</td>
                                                <td>{values.email}</td>
                                            </tr>
                                        </>
                                    })
                                    : null}
                            </table>
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
