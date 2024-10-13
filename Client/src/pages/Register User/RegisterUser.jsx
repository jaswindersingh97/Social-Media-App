import { useState } from "react";
import {AuthPageLayout,Form} from "../../components/index";
import { ValidateFields } from "../../HelperFunction/ValidateFields";
import apiRequest from "../../Apis/apiRequest";
import {useNavigate} from 'react-router-dom';
export default function Register() {
    const endpoint= "/auth/register";
    const navigate = useNavigate();
    const [responseWindow,setResponseWindow]= useState(false);
    const [responseMessage,setResponseMessage] =useState("");
    const [formData, setFormData] = useState({      // to save the current state of input fields
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({        // to save the error of any value
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const formFields = [
        {
            name: "username",
            type: "text",
            placeholder: "Enter your name",
            value: formData.username,
            onChange: (e) => setFormData({ ...formData, username: e.target.value }),
        },
        {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
            
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            value: formData.password,
            onChange: (e) => setFormData({ ...formData, password: e.target.value }),
            
        },
        {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm your password",
            value: formData.confirmPassword,
            onChange: (e) => setFormData({ ...formData, confirmPassword: e.target.value }),
            
        },
       
    ];

    const errorMessages = {
        username: {
            message: "Name is required",
            isValid: formData.username.length > 0,
            onError: () => setError((prev) => ({ ...prev, name: true }))
        },
        email: {
            message: "Email is required",
            isValid: formData.email.length > 0,
            onError: () => setError((prev) => ({ ...prev, email: true }))
        },
        password: {
            message: "Password is required",
            isValid: formData.password.length > 0,
            onError: () => setError((prev) => ({ ...prev, password: true }))
        },
        confirmPassword: {
            message: "Passwords do not match",
            isValid: formData.confirmPassword === formData.password,
            onError: () => setError((prev) => ({ ...prev, confirmPassword: true }))
        },
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const {isError,updatedError} = ValidateFields(errorMessages) 
        setError(updatedError);
        const { confirmPassword, ...dataToSend } = formData;
        console.log(dataToSend)
        if (!isError) {        
            const response = await apiRequest({
            endpoint: endpoint,
            method: 'post',
            data: dataToSend
        });
        console.log(response)
        // Check if the response indicates a success
        if (response.status === 200 ||response.status === 201) {
          console.log(response)
            setResponseMessage("registered successfully,redirecting in 3 sec");
            setResponseWindow(true);
            setTimeout(() => {
                setResponseWindow(false);
                navigate('/signIn'); // Redirect to home after 3 seconds
            }, 5000);
        } else {
            // Handle error cases (including 400 for validation)
            setResponseMessage(response.data.error || "Something went wrong");
            setResponseWindow(true);
        }
        }
    };

    return (
        <AuthPageLayout 
            Component={
                <>
                <Form 
                    heading={"Register"}
                    error={error} 
                    formFields={formFields} 
                    onSubmit={onSubmit} 
                    errorMessages={errorMessages}
                />
                        {responseWindow && (
          <div className="response-window">
            {responseMessage}
          </div>)}

                </>
                }
            responseWindow={responseWindow}
        />
    );
}
