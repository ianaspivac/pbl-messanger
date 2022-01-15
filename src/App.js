import './App.css';
import {Switch, Route} from "react-router-dom";
import Chats from "./pages/Chats";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn"
import Popup from "./components/PopupAccount/Popup";
import {useEffect, useState} from "react";
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
        <Route path="/chats" exact>
          <Chats/>
        </Route>
        <Route path="/signup" exact>
          <SignUp/>
        </Route>
        <Route path="/login" exact>
          <LogIn/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
