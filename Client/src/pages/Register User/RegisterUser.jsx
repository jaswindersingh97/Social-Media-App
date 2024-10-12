import Form from "./../../components/FormField/FormField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterUser.module.css';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        checkBox: false
    });
    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        checkBox: false
    });

    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Enter your name",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            className: styles.formFields
        },
        {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
            className: styles.formFields
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            value: formData.password,
            onChange: (e) => setFormData({ ...formData, password: e.target.value }),
            className: styles.formFields
        },
        {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm your password",
            value: formData.confirmPassword,
            onChange: (e) => setFormData({ ...formData, confirmPassword: e.target.value }),
            className: styles.formFields
        },
        {
            name: "checkBox",
            type: "checkbox",
            label: "Agree to terms and conditions",
            checked: formData.checkBox,
            onChange: (e) => setFormData({ ...formData, checkBox: e.target.checked }),
            className: styles.textbox
        }
    ];

    const errorMessages = {
        name: {
            message: "Name is required",
            isValid: formData.name.length > 0,
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
        checkBox: {
            message: "You must agree to terms and conditions",
            isValid: formData.checkBox,
            onError: () => setError((prev) => ({ ...prev, checkBox: true }))
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let isError = false;

        let updatedError = {};

        Object.keys(errorMessages).forEach((key) => {
            if (!errorMessages[key].isValid) {
                isError = true;
                updatedError[key] = true;
            } else {
                updatedError[key] = false;
            }
        });

        setError(updatedError);

        if (!isError) {
            // Uncomment when the register function is implemented
            // const res = await register(formData);
            // if (res.status === 201) {
            //     alert("Registered successfully");
            //     navigate("/login"); 
            // } else {
            //     alert("Something went wrong");
            // }
        }
    };

    return (
        <>
            <p>Register</p>
            <Form 
                error={error} 
                formFields={formFields} 
                onSubmit={onSubmit} 
                errorMessages={errorMessages} 
            />
        </>
    );
}
