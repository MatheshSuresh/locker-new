export default function validateInfo(values){
    let errors={};
    
     if(!values.username){
        errors.email="Email required"
    }
    if(!values.password){
        errors.password="Password required"
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password))
    {
        errors.password="Password needs to be 8 characters or more,One uppercase,one lowercase,one special character"
    }
    return errors;
}