import {useState} from 'react'
import {AuthPageLayout,Form} from './../../components/index';
function SignIn() {
  const [formData, setFormData] = useState({      // to save the current state of input fields
    email: "",
    password: "",
});
const [error, setError] = useState({        // to save the error of any value
    email: false,
    password: false,
});

const formFields = [   
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
];

const errorMessages = {
    email: {
        message: "Email is required",
        isValid: formData.email.length > 0,
        onError: () => setError((prev) => ({ ...prev, email: true }))
    },
    password: {
        message: "Password is required",
        isValid: formData.password.length > 0,
        onError: () => setError((prev) => ({ ...prev, password: true }))
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
    }
};

  return (
      <AuthPageLayout Component={
            <Form 
                heading={"Sign In"}
                error={error} 
                formFields={formFields} 
                onSubmit={onSubmit} 
                errorMessages={errorMessages}
            />}
        />
  )
}

export default SignIn
