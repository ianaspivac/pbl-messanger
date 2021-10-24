import './ChatMessages.css'
import {useRef, useState} from 'react'

function SendMessage() {
    const textInputRef = useRef();
    //currentid will be saved somewhere on store
    const currentId=2
    const [enteredText, setEnteredText] = useState("");

    const getTextHandler = (event) => {
        setEnteredText(event.target.value);
    }

    const sendMessage = (event) => {
        event.preventDefault()
        console.log(enteredText)
        // fetch(
        //     ``,
        //     {
        //         method: "POST",
        //         body: JSON.stringify({enteredText,Date.now(),currentId}),
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }
        // )
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             response.json().then((data) => {
        //                 console.log(data);
        //             });
        //         }
        //     })
        //     .then((data) => {
        //        //update the dialog
        //     });
        setEnteredText("")
    }

    return (
        <div className="send-message-container">
            <form id="send-message-form" onSubmit={sendMessage}>
                <textarea ref={textInputRef} value={enteredText} onChange={getTextHandler} className="send-message-input"
                          form="send-message-form" name="message" placeholder="Enter the message and tap Enter..."
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                          required/>
            </form>
        </div>
    );
}

export default SendMessage;