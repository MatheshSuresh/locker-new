import axios from 'axios';
import {useEffect, useState} from 'react';
// import {useNavigate} from "react-router-dom";


const useLoginForm = (validateInfo) => {
    // let navigate=useNavigate();
    const API_URL = "http://localhost:3001/user/login"
    const [values,setValues] = useState({
        username:"",
        password:""
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
            password:values.password
        })
    .then(res=>{
        sessionStorage.setItem('auth',JSON.stringify(res.data))
        // navigate("/dashboard");
        console.log("Login success")
    })
    .catch(err=>{
        alert("Invaild User Credenitials");
    })
    }
},[errors])// eslint-disable-line react-hooks/exhaustive-deps

return {handleChange,values,handleSubmit,errors};
}

export default useLoginForm;
