import './Popup.css'
import {useState} from 'react'

function PasswordPopup(props) {

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleCurrentPassword = (event) => {
        setCurrentPassword(event.target.value)
    }

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

    const comparePassword = (event) => {
        setConfirmPassword(event.target.value)
    }
    const handleSubmit = () => {
      
    }
  const closeSettings = () => {
    props.onCloseSettings()
  }

  return (
    <div className="popup-container">
      <button className="popup-close" onClick={closeSettings}></button>
            <form className="popup-form-password" onSubmit={handleSubmit}>
              <div className="popup-headline">Change Password</div>
                <input className="popup-input" type="password" placeholder="Current password" value={currentPassword}
                       onChange={handleCurrentPassword}/>

                <input className="popup-input"  type="password" placeholder="New Password" value={newPassword}
                       onChange={handleNewPassword}/>

                <input className="popup-input"  type="password" placeholder="Confirm Password" value={confirmPassword}
                       onChange={comparePassword}/>

                <input className="popup-submit" type="submit" value="Submit"/>
            </form>
            <div className="popup-back">
                <button onClick={()=>props.openTab(0)} className="back-button">&lt;- Back</button>
            </div>
        </div>
    );
}

export default PasswordPopup;