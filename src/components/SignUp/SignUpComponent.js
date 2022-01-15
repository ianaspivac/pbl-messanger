import React, {useEffect, useState} from "react";
import './SignUp.css'
import {Link, useHistory} from "react-router-dom";
import {postSignUp} from "../../services/postSignUp";



export default function SignUpComponent (){
    
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [fullNameDirty, setFullNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [repeatedPasswordDirty, setRepeatedPasswordDirty] = useState(false);
    const [fullNameError, setFullNameError] = useState("Full name fild can't be empty");
    const [emailError, setEmailError] = useState("Email filed can't be empty");
    const [passwordError, setPasswordError] = useState("Password filed can't be empty");
    const [repeatedPasswordError, setRepeatedPasswordError] = useState("Repeated password filed can't be empty");
    const [formValid, setFormValid] = useState(false);

    let history = useHistory();

    const fullNameHandler = (e) => {
        setFullName(e.target.value);
        if(!e.target.value){
            setFullNameError("Full name field can't be empty");
        }
        else {
            setFullNameError("")
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (!re.test(String(e.target.value).toLowerCase())){
             setEmailError('Email is invalid');
             if(!e.target.value){
                 setEmailError("Email filed can't be empty");
             }
         }
         else {
             setEmailError("");
         }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 7){
            setPasswordError("Password's length can't be less then 7");
            if(!e.target.value){
                setPasswordError("Password filed can't be empty")
            }
        }
        else{
            setPasswordError("");
        }
    }

    const repeatedPasswordHandler = (e) => {
        setRepeatedPassword(e.target.value);
        if(e.target.value !== password){
            setRepeatedPasswordError("Passwords don't match");
        }
        else{
            setRepeatedPasswordError("");
        }
    }

    useEffect(() => {
        if(emailError || passwordError || fullNameError){
            setFormValid(false);
        }
        else {
            setFormValid(true);
        }
    }, [emailError, passwordError, fullNameError])

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'fullName':
                setFullNameDirty(true)
                break
            case 'confirmPassword':
                setRepeatedPasswordDirty(true)
                break
        }
    }

    const submitHandler = (event) =>{
        event.preventDefault();

        const response = postSignUp({full_name: fullName, email: email, password: password});
        history.push("/login");
    }

    return(
        <div className="wrapper">
            <h1 className="header">Sign up</h1>
            <div className="form">
                <form onSubmit={submitHandler}>
                    {(fullNameError && fullNameDirty) && <span className="error">{fullNameError}</span>}
                    <input type="text" placeholder="Enter full name"
                           value={fullName}
                           name="fullName"
                           onBlur={e => blurHandler(e)}
                           onChange={(e) => fullNameHandler(e)}
                    />

                    {(emailError && emailDirty) && <span className="error">{emailError}</span>}
                    <input type="text" placeholder="Enter email"
                           value={email} name="email"
                           onBlur={e => blurHandler(e)}
                           onChange={(e) => emailHandler(e)}
                    />

                    {(passwordError && passwordDirty) && <span className="error">{passwordError}</span>}
                    <input type="password" placeholder="Enter password"
                           value={password} name="password"
                           onBlur={e => blurHandler(e)}
                           onChange={(e) => passwordHandler(e)}
                    />
                    {(repeatedPasswordError && repeatedPasswordDirty) && <span className="error">{repeatedPasswordError}</span>}
                    <input type="password"
                           placeholder="Confirm password"
                           value={repeatedPassword} name="confirmPassword"
                           onBlur={e => blurHandler(e)}
                           onChange={(e) => repeatedPasswordHandler(e)}
                    />
                    <button disabled={!formValid}
                            type="submit"
                            className="btn-signUp"
                            style={!formValid ? {background: "gray"} : {}}
                    >Sign up</button>
                </form>
                <div>
                    <p className="p-already-register">Already registered? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    )
}