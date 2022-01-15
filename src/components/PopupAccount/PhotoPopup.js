import './Popup.css'
import {useState} from "react";


function PhotoPopup(props) {
  const [photoSrc, setPhotoSrc] = useState(props.photoSrc)
  let [editingPhoto, setEditingPhoto] = useState(false)

  const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))

  const setPhotoHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditingPhoto(true)
      toDataURL(URL.createObjectURL(event.target.files[0])).then(dataUrl => {
        setPhotoSrc(dataUrl)
      })
    }
  }
  const toggleEditPhoto = () => {
    setEditingPhoto((editingPhoto) => !editingPhoto)
  }

  const saveHandler = () => {
    localStorage.removeItem("photoSrc")
    localStorage.setItem("photoSrc", photoSrc)

    toggleEditPhoto()
  }

  const undoHandler = () => {
    setPhotoSrc(props.photoSrc)
    toggleEditPhoto()
  }

  const closeSettings = () => {
    props.onCloseSettings()
  }

  return (
    <div className="popup-container">
      <button className="popup-close" onClick={closeSettings}></button>
      <div className="popup-photo"><img src={photoSrc}/></div>
      <div className="popup-name">{props.name}</div>
      <div>
        <input type="file" onClick={setPhotoHandler} className="popup-photo-select-btn" name="photo"
               accept="image/png, image/jpeg"/>
      </div>
      {editingPhoto && <div className="popup-accept">
        <button className="confirm" name="accept" onClick={saveHandler}>Accept</button>
        <button className="undo" name="undo" onClick={undoHandler}>Undo</button>
      </div>}
      <div className="popup-back">
        <button onClick={() => props.openTab(0)} className="back-button">&lt;- Back</button>
      </div>
    </div>
  );
}

export default PhotoPopup;