import ChatMessages from "../components/ChatMessages/ChatMessages";
import DialogComponent from "../components/Dialogs/DialogComponent";

function Chats() {
    return (
        <div className="chats-wrapper">
            <DialogComponent/>
           <ChatMessages/>
        </div>
    );
}

export default Chats;