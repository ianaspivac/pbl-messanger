import UserMessage from "./UserMessage";
import OtherUserMessage from "./OtherUserMessage";
import SendMessage from "./SendMessage";
import {useEffect, useRef, useState} from "react";
import avatar from '../../images/fox-avatar.svg'
import plus from '../../images/plus.svg'
import {useSelector} from "react-redux";

function ChatMessages(props) {
  const [dialog, setDialog] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const inviteInputRef = useRef();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  const transformUnix = (unixTimestamp) => {
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2)
  };

  const typeMessage = (id, timestamp, text, name) => {
    if (id != userId) {
      return <OtherUserMessage
        timestamp={timestamp} text={text} name={name}/>
    } else {
      return <UserMessage timestamp={timestamp} text={text} name="Me"/>
    }
  }

  const getDialog = () => {
    let bearer  = 'Bearer ' + token;
    fetch(`http://81.180.72.35:8080/message/${props.roomId}`
      , {
        method: 'GET',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        const messagesList = []
        for (const message in data.data) {
          messagesList.push({
            text: data.data[message].data,
            userId: data.data[message].sender_id,
            timestamp: transformUnix(data.data[message].time),
            name: data.data[message].sender_name
          })
        }
        setDialog(messagesList)
      });
  }

  const textSentHandler = (text) => {
    setDialog((dialog) => [...dialog, {
      text,
      userId,
      timestamp: transformUnix(Date.now()),
      name: "Me"
    }])
  }

  const sendInvite = (event) => {
    event.preventDefault()
    const inviteEmail = inviteInputRef.current.value;
    fetch(
      `http://81.180.72.35:8080/room/add/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({participant_email: inviteEmail, room_id: props.roomId}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`Invited ${inviteEmail} to this room`)
          return response.json();
        } else {
          response.json().then((data) => {
            alert(`Invalid email`)
          });
        }
      })
    setShowAdd(false)
  };
//Please when working, comment this
  useEffect(() => {
    const interval = setInterval(() => {
      getDialog()
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [props.roomId])

  //and uncomment this
  // useEffect(() => {
  //   getDialog()
  // }, [props.roomId])

  return (
    <div className="chat-messages-container">
      {showAdd && <div className="chat-add-participant">
        <div className="heading">Add a participant</div>
        <form onSubmit={sendInvite}>
          <input type="email" placeholder="Enter user's email" ref={inviteInputRef}/>
          <input type="image" src={plus} alt="Add user"/>
        </form>
      </div>}
      <div className="chat-messages-header">
        <div className="chat-messages-avatar"><img src={avatar}/></div>
        <span>{props.roomName}</span>
        <button className="chat-messages-add" onClick={() => setShowAdd(true)}><img src={plus} alt="Add participants"/>
        </button>
        <button className="chat-messages-back">&lt;-Back</button>
      </div>
      <div className="chat-messages-dialog-container">
        {
          dialog && dialog.length > 0 && dialog.map((message) => typeMessage(message.userId, message.timestamp, message.text, message.name))
        }
        {dialog.length < 0 &&
        <div className="chat-messages-container-empty">Write first to start chatting</div>}
      </div>
      <SendMessage roomId={props.roomId} onTextSent={textSentHandler}/>
    </div>
  );
};

export default ChatMessages;