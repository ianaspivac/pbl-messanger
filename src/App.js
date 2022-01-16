import './App.css';
import {Switch, Route, Redirect} from "react-router-dom";
import Chats from "./pages/Chats";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn"
import Popup from "./components/PopupAccount/Popup";
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import photo from "./images/photo-default.svg";
import Header from "./components/Header/Header";

//in future might be deletated, as data already will be in binary format
const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [settingsOpened, setSettingsOpened] = useState(false)

  useEffect(() => {
    toDataURL(photo)
      .then(dataUrl => {
        localStorage.setItem("photoSrc", dataUrl)
      })
  })

  const openSettings = () => {
    setSettingsOpened(true)
  }

  const closeSettings = () => {
    setSettingsOpened(false)
  }

  return (
    <div className="App">
      <Header onOpenSettings={openSettings}/>
      {settingsOpened && <Popup onCloseSettings={closeSettings}/>}
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/chats" />}
        </Route>
        <Route path="/chats" exact>
          {isLoggedIn ? <Chats/> : <Redirect to="/login" />}
        </Route>
        <Route path="/signup" exact>
          {!isLoggedIn ? <SignUp/> : <Redirect to="/chats" />}
        </Route>
        <Route path="/login" exact>
          {!isLoggedIn ? <LogIn/> : <Redirect to="/chats" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
