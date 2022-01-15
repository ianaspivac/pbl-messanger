import ChatMessages from "../components/ChatMessages/ChatMessages"
import DialogComponent from "../components/Dialogs/DialogComponent"
import {useState} from "react";
import "./Chats.css"

function Chats() {
  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);

  const openChat = (id, name) => {
    setIsOpen(true);
    setRoomId(id);
    setRoomName(name)
  };

    return (
        <div className="chats-wrapper">
            <DialogComponent openChat={openChat}/>
          {isOpen && <ChatMessages roomId={roomId} roomName={roomName}/>}
          {!isOpen && <div className="chats-none">No chat opened.</div>}
        </div>
    );
}

export default Chats;