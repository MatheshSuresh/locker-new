import axios from 'axios';
import { useEffect, useState } from 'react';

const useAdminCtrlForm = (validateInfo) => {
    const API_URL = "https://smartlockers.herokuapp.com/locker/insertlocker"
    const [values, setValues] = useState({
        name: "",
        status: "",
        subscribe_topic: "",
        publish_topic: "",
        key: ""
    });
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        setErrors(await validateInfo(values));
    }


    useEffect(() => {
        if (Object.keys(errors).length === 0 && submit) {
            axios.post(API_URL, {
                name: values.name,
                status: values.status,
                subscribe_topic: values.subscribe_topic,
                publish_topic: values.publish_topic,
                key: values.key
            })
                .then(res => {
                    alert("Locker Added")
                    setSubmit(false);
                })
                .catch(err => {
                    console.log("Cant Add Locker");
                })
        }

    }, [errors])// eslint-disable-line react-hooks/exhaustive-deps

    return { handleChange, values, handleSubmit, errors };
}

export default useAdminCtrlForm;
