import './ChatMessages.css'
import {useRef, useState} from 'react'
import {useSelector} from "react-redux";

function SendMessage(props) {
  const userId = useSelector((state) => state.userId);
  const textInputRef = useRef();

  const [enteredText, setEnteredText] = useState("");

  const getTextHandler = (event) => {
    setEnteredText(event.target.value);
  }

  const sendMessage = (event) => {
    event.preventDefault()
    props.onTextSent(event.target.value)

    fetch(
      `http://81.180.72.35:8080/message/create/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({data: enteredText, room_id: props.roomId}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })

    setEnteredText("")
  }

  return (
    <div className="send-message-container">
      <form id="send-message-form" onSubmit={sendMessage}>
                <textarea ref={textInputRef} value={enteredText} onChange={getTextHandler}
                          className="send-message-input"
                          form="send-message-form" name="message" placeholder="Enter the message and tap Enter..."
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                          required/>
      </form>
    </div>
  );
}

export default SendMessage;