export default function validateInfo(values){
    let errors={};
    
     if(!values.name){
        errors.name="name required"
    }
    if(!values.status){
        errors.status="Status required"
    }
    if(!values.subscribe_topic){
        errors.topic="Subscribe Topic required"
    }
    if(!values.publish_topic){
        errors.topic="Publish Topic required"
    }
    if(!values.key){
        errors.key="Unlock Key required"
    }
   
    return errors;
}