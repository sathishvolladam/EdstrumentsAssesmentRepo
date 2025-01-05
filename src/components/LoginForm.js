import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import '../styles/LoginPage.css'

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

  useEffect(() => {
    // console.log("here")
    document.title = 'Welcome to Login';
    const session = localStorage.getItem('session');  
    if (session) {
      navigate('/main');  // Auto-login if session exists
    } else {
      const savedData = localStorage.getItem('formData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setInitialValues(parsedData);  // Pre-fill the form without navigation
      }
    }
    setIsLoading(false);  // Stop loading once checks are complete
  }, []);  

  const validationSchema = Yup.object({
    username: Yup.string().required('Please Enter Username.'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Please Enter Password.'),
  });

  const handleSubmit = (values) => {
    
    localStorage.setItem('session', JSON.stringify(values));  // Save session on login
    localStorage.setItem('formData', JSON.stringify(values));
    navigate('/main');  // Navigate after login
    // console.log(values)
  }

  if (isLoading) {
    return <div>Loading...</div>;  // Prevents form rendering until loading is complete
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
        {
            ({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,})=>(
<Form onSubmit={handleSubmit}>
        <div className="login-container">
        <div className="login-form">
          <label>Username</label>
          <Field type="text" name="username" />
          <ErrorMessage className='error-message' name="username" component="div" />
        {/* </div>
        <div className="login-form"> */}
          <label>Password</label>
          <Field type="password" name="password" />
          <ErrorMessage className = 'error-message' name="password" component="div" />
        <button type="submit">Login</button>
        </div>
        </div>
      </Form>
            )
        }
      
    </Formik>
  );
};

export default LoginForm;
