import './Popup.css'
import MainPopup from "./MainPopup";
import {useEffect, useState} from "react";
import PasswordPopup from "./PasswordPopup";
import PhotoPopup from "./PhotoPopup";

function Popup(props) {

    const [activeTab, setActiveTab] = useState(0)

    const handleOpenTab = (event) => {
        setActiveTab(event)
    }

    const [photoSrc, setPhotoSrc] = useState("")
    const [name, setName] = useState("Test Name")

    useEffect(() => {
        setPhotoSrc(localStorage.getItem("photoSrc"))
    })
    const closeSettings = ()=>{
        props.onCloseSettings()
    }

    return (
        <div className="popup-overlay">
            {activeTab === 0 && <MainPopup photoSrc={photoSrc} name={name} onCloseSettings={closeSettings} openTab={handleOpenTab}/>}
            {activeTab === 1 && <PasswordPopup openTab={handleOpenTab} onCloseSettings={closeSettings}/>}
            {activeTab === 2 && <PhotoPopup photoSrc={photoSrc} name={name} onCloseSettings={closeSettings} openTab={handleOpenTab}/>}
        </div>
    );
}

export default Popup;