import React, {useState} from "react";
import './LogIn.css'
import logo from '../../images/fox-head 1.svg'
import {Link} from "react-router-dom";
export default function LogInComponent () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) =>{
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        fetch('http://localhost:8080/user/login', requestOptions)
            .then(response => console.log(response))


    }

    return(
        <div className="logInWrapper">
            <img src={logo} alt="Logo" className="logo"/>
            <p className="logo-text">Foxy</p>
            <form onSubmit={submitHandler}>
                <input type="text"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn-signUp">Login</button>
            </form>
            <div>
                <p className="p-already-register">Don't have a profile? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}