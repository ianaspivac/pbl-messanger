import './ChatMessages.css'

function OtherUserMessage(props) {
    return (
        <div className="other-user-message-container">
            <div className="other-user-message-photo"></div>
            <div className="other-user-message">
                <div className="other-user-message-data"><p><span>{props.name}</span> <span>{props.timestamp}</span></p></div>

                <div className="other-user-message-text">{props.text}
            </div>
            </div>
        </div>
    );
}

export default OtherUserMessage;