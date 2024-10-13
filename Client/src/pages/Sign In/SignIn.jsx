import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPageLayout, Form } from './../../components/index';
import { ValidateFields } from '../../HelperFunction/ValidateFields';
import apiRequest from '../../Apis/apiRequest';

function SignIn() {
  const endpoint = "/auth/login";
  const navigate = useNavigate();
  const [responseWindow, setResponseWindow] = useState(false);
  const [formData, setFormData] = useState({      
    email: "",
    password: "",
  });
  const [error, setError] = useState({        
    email: false,
    password: false,
  });
  const [responseMessage, setResponseMessage] = useState('');  // Renamed for clarity

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
      onError: () => setError((prev) => ({ ...prev, email: true })),
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => setError((prev) => ({ ...prev, password: true })),
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { isError, updatedError } = ValidateFields(errorMessages);
    setError(updatedError);

    if (!isError) {
        const response = await apiRequest({
            endpoint: endpoint,
            method: 'post',
            data: formData
        });

        // Check if the response indicates a success
        if (response.status === 200) {
          console.log(response)
            setResponseMessage("Logged in successfully,redirecting in 3 sec");
            localStorage.setItem("token",response.data.token);
            setResponseWindow(true);
            setTimeout(() => {
                setResponseWindow(false);
                // navigate('/home'); // Redirect to home after 3 seconds
            }, 5000);
        } else {
            // Handle error cases (including 400 for validation)
            setResponseMessage(response.data.error || "Something went wrong");
            setResponseWindow(true);
        }
    }
};


// };

  return (
    <AuthPageLayout Component={
      <>
        <Form 
          heading={"Sign In"}
          error={error} 
          formFields={formFields} 
          onSubmit={onSubmit} 
          errorMessages={errorMessages}
        />
        {responseWindow && (
          <div className="response-window">
            {responseMessage}
          </div>
        )}
      </>
    } />
  );
}

export default SignIn;
