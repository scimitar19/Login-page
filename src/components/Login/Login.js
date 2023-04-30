import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const ACTIONS = {EMAIL_INPUT: "email_input",
                 EMAIL_BLUR: "email_blur",
                 PASSWORD_INPUT: "password_input",
                 PASSWORD_BLUR: "password_blur"}

const emailReducer = (state, action) => {
   if (action.type === ACTIONS.EMAIL_INPUT) {
     return {value: action.payload, isValid: action.payload.includes("@")}
   }
   if (action.type === ACTIONS.EMAIL_BLUR) {
     return {value: state.value, isValid: state.isValid}
   }
}

const passwordReducer = (state, action) => {
  if(action.type === ACTIONS.PASSWORD_INPUT) {

    return {value: action.validation, isOK: action.validation.trim().length > 6}
  }
  if (action.type === ACTIONS.PASSWORD_BLUR) {
    return {value: state.value, isOK: state.isOK}
  }
  

}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  
  
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: false})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value: "", isOK: false})
  
  const {isValid: emailIsOK} = emailState;
  const {isOK: passwordIsOK} = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsOK && passwordIsOK
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsOK, passwordIsOK]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: ACTIONS.EMAIL_INPUT, payload: event.target.value});

    
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: ACTIONS.PASSWORD_INPUT, validation: event.target.value});

    
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: ACTIONS.EMAIL_BLUR});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: ACTIONS.PASSWORD_BLUR});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isOK === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
