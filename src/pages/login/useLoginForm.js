import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


const API_URL='http://localhost:3001/user/login';
const useLoginForm = (validateInfo) => {
   const navigate=useNavigate();
    const [values,setValues] = useState({
        email:"",
        password:""
    });
    const [errors,setErrors]=useState({});
    const [submit,SetSubmit]=useState(false);


const handleChange= e =>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        });
    };
const handleSubmit=async(e)=>{
    e.preventDefault();
   
    setErrors(validateInfo(values));
    SetSubmit(true);
    
}
useEffect(() => {
    if(Object.keys(errors).length===0 && submit){
        axios.post(API_URL,{
        email:values.email,
        password:values.password
    })
    .then(res=>{
        sessionStorage.setItem('auth',JSON.stringify(res.data))
        navigate("/dashboard");

    })
    .catch(err =>{
         console.log(err)
    })
    }
}, [errors])// eslint-disable-line react-hooks/exhaustive-deps


return {handleChange,values,handleSubmit,errors};
}

export default useLoginForm;
