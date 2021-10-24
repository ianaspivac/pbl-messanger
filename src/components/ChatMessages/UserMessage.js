import './ChatMessages.css'

function UserMessage(props) {
    return (
        <div className="user-message-container">
            <div className="user-message-data"><p><span>{props.name}</span> <span>{props.timestamp}</span></p></div>
            <div className="user-message-text">{props.text}
               </div>
        </div>
    );
}

export default UserMessage;