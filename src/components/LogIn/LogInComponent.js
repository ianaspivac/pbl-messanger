import React, {useState} from "react";
import './LogIn.css'
import logo from '../../images/fox-head 1.svg'
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postLogin} from "../../services/postLogin";

export default function LogInComponent() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const history = useHistory();


  const submitHandler = (event) => {
    event.preventDefault();

    const response = postLogin({email: email, password: password}).then(function (response) {
        if (response.data !== null) {
          dispatch({
            type: "LOGIN",
            payload: response.data.id.toString()
          });
          localStorage.setItem('userId', response.data.id.toString())
          history.push('/chats');
          setInvalidCredentials(false);
        } else {
          setInvalidCredentials(true);
        }
      }
    );
  }

  return (
    <div className="logInWrapper">
      <img src={logo} alt="Logo" className="logo"/>
      <p className="logo-text">Foxy</p>
      <form onSubmit={submitHandler} onChange={() => setInvalidCredentials(false)}>
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
        {invalidCredentials && <div className="error-invalid">Invalid credentials</div>}
        <button type="submit" className="btn-signUp">Login</button>
      </form>
      <div>
        <p className="p-already-register">Don't have a profile? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}