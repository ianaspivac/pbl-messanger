import UserMessage from "./UserMessage";
import OtherUserMessage from "./OtherUserMessage";

function ChatMessages() {
    return (
        <div>
            <OtherUserMessage/>
            <UserMessage/>
        </div>
    );
}

export default ChatMessages;