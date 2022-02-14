import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


const useRegisterForm = (validateInfo) => {
    let navigate=useNavigate();
    const API_URL = "https://smartlockers.herokuapp.com/user/register"
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        password2:""
    });
    const [errors,setErrors]=useState({});
    const [submit,setSubmit]=useState(false);

const handleChange= e =>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        });
    };
const handleSubmit=async(e)=>{
    e.preventDefault();
    setSubmit(true);
    setErrors(await validateInfo(values)); 
}


useEffect(()=>{
    if(Object.keys(errors).length===0 && submit){
         axios.post(API_URL,{
            username:values.username,
            email:values.email,
            password:values.password
        })
    .then(res=>{
        navigate("/");
        console.log("registration success");
        navigate("/login");
    })
    .catch(err=>{
        console.log("Registration Failed");
    })
    }
},[errors])// eslint-disable-line react-hooks/exhaustive-deps

return {handleChange,values,handleSubmit,errors};
}

export default useRegisterForm;
