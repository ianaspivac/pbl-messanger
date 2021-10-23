import React, {useState} from "react";
import './SignUp.css'



export default function SignUpComponent (){
    
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) =>{
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: fullName, email: email, password: password })
        };

        fetch('http://localhost:8080/user/register', requestOptions)
            .then(response => console.log(response))


    }

    return(
        <div className="wrapper">
            <h1 className="header">Sign up</h1>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Enter full name"
                           value={fullName}
                           name="fullName"
                           onChange={(e) => setFullName(e.target.value)}
                    />
                    <input type="text" placeholder="Enter email"
                           value={email} name="email"
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Enter password"
                           value={password} name="password"
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="password" placeholder="Confirm password" name="confirmPassword" />
                    <button type="submit" className="btn-signUp">Sign up</button>
                </form>
            </div>
        </div>
    )
}