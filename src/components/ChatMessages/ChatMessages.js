import UserMessage from "./UserMessage";
import OtherUserMessage from "./OtherUserMessage";
import SendMessage from "./SendMessage";
import {useEffect, useState} from "react";

function ChatMessages() {
    const currentUserId = 2;
    const [dialog, setDialog] = useState([]);

    const transformUnix = (unixTimestamp) => {
        let date = new Date(unixTimestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2)
    };

    const typeMessage = (userId, timestamp, text, name) => {
        if (userId != currentUserId) {
            return <OtherUserMessage
                timestamp={timestamp} text={text} name={name}/>
        } else {
            return <UserMessage timestamp={timestamp} text={text} name={name}/>
        }


    }

    const getDialog = () => {
        fetch('./dialogData.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(function (response) {
            console.log(response)
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                fetch('./userData.json'
                    , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                ).then(function (response) {
                    console.log(response)
                    return response.json();
                })
                    .then(function (dataUser) {
                        console.log(dataUser);
                        const messagesList = []
                        for (const message in data.room) {
                            messagesList.push({
                                text: data.room[message].data,
                                userId: data.room[message].userid,
                                timestamp: transformUnix(data.room[message].timestamp),
                                name: dataUser[data.room[message].userid].name
                            })
                        }
                        setDialog(messagesList)
                        console.log(dialog)
                    });

            });
    }

    useEffect(() => {
        getDialog()
    }, [])

    return (
        <div className="chat-messages-container">
            <div className="chat-messages-dialog-container">
                {
                    dialog && dialog.length > 0 && dialog.map((message) => typeMessage(message.userId, message.timestamp, message.text, message.name))
                }
                {dialog.length < 0 &&
                <div className="chat-messages-container-empty">Write first to start chatting</div>}
            </div>
            <SendMessage/>
        </div>
    );
}

export default ChatMessages;