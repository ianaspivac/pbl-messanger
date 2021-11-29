import React, {useState} from "react";
import './LogIn.css'
import logo from '../../images/fox-head 1.svg'
import {Link, useHistory} from "react-router-dom";
import {postLogin} from "../../services/postLogin";
export default function LogInComponent () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const submitHandler = (event) =>{
        event.preventDefault();

        const response = postLogin({email: email, password: password});
        localStorage.setItem('userId', response.data.id.toString());
        history.push('/chats');
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