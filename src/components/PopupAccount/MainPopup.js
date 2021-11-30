import "./Popup.css"
import {useState, useEffect} from "react"

function MainPopup(props) {

  const closeSettings = () => {
    props.onCloseSettings(true)
  }

  return (
    <div className="popup-container">
      <button className="popup-close" onClick={closeSettings}></button>
      <div className="popup-photo"><img alt="profile-pic" src={props.photoSrc}/>
      </div>
      <div className="popup-name">{props.name}</div>
      <div className="popup-option">
        <button className="popup-option-button privacy-button" onClick={() => props.openTab(1)}>Privacy and
          security
        </button>
      </div>
      <div className="popup-option">
        <button className="popup-option-button change-photo-button" onClick={() => props.openTab(2)}>Change
          photo
        </button>
      </div>
      <div className="popup-logout">
        <button className="popup-option-button logout-button">Logout</button>
      </div>
    </div>
  );
}

export default MainPopup;