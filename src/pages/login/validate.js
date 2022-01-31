export default function validateInfo(values){
    let errors={};
    
     if(!values.email){
        errors.email="Email required"
    }else if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.email)){
        errors.email="Invaild Email Address"
    }
    if(!values.password){
        errors.password="Password required"
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password))
    {
        errors.password="Password needs to be 8 characters or more,One uppercase,one lowercase,one special character"
    }
    return errors;
}