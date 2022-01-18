import React from "react";
import './Dialog.css'
import {useEffect, useState, useRef} from "react";
import avatar from "../../images/fox-avatar.svg";
import add from "../../images/add.svg";
import accept from "../../images/accept.svg";
import close from "../../images/close.svg";
import {useSelector} from "react-redux";

export default function DialogComponent(props) {
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  const [dialogs, setDialogs] = useState([]);
  const [initialDialogs, setInitialDialogs] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const roomNameRef = useRef();

  const searchDialog = (event) => {
    const filteredDialogs = dialogs.filter(dialog => dialog.name.toLowerCase().includes(event.target.value.toLowerCase()));
    event.target.value.length === 0 ? setDialogs(initialDialogs) : setDialogs(filteredDialogs)
  };

  const getDialogs = () => {
    let bearer = 'Bearer ' + token;
    fetch(`http://81.180.72.35:8080/room/${userId}`
      , {
        method: 'GET',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        }
      }
    ).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        const dialogs = data.data;
        const dialogList = []
        for (const dialog in dialogs) {
          dialogList.push({
            name: dialogs[dialog].name,
            id: dialogs[dialog].id
          })
        }
        setDialogs(dialogList)
        setInitialDialogs(dialogList)
      });
  }

  const createRoom = (event) => {
    event.preventDefault();
    let bearer = 'Bearer ' + token;
    const name = roomNameRef.current.value;
    fetch(
      `http://81.180.72.35:8080/room/create/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({name}),
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then(function (data) {
        setInitialDialogs((initialDialogs) => [...initialDialogs, {
          name,
          id: data.data.id
        }])
        setDialogs((dialogs) => [...dialogs, {
          name,
          id: data.data.id
        }])
      }
    );
    setIsSearch(true);
  };

  const resetSearch = () => {
    setDialogs(initialDialogs);
  };
//when working comment this
  useEffect(() => {
    const interval = setInterval(() => {
      getDialogs()
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [])

  //and uncomment this
  // useEffect(() => {
  //   getDialogs()
  // }, [])

  return (
    <div className="dialog-wrapper">
      {!isSearch ?
        <div className="dialog-create-room">
          <form onSubmit={createRoom}>
            <input type="text"
                   placeholder="Create a room"
                   className="dialog-input"
                   ref={roomNameRef}
            />
            <input type="image" src={accept} alt="Create" className="dialog-accept"/>
            <button className="dialog-cancel" onClick={() => {
              setIsSearch(true);
            }}><img src={close}/></button>
          </form>
        </div> :
        <div className="dialog-search-wrapper">
          <input type="text"
                 placeholder="Search"
                 className="dialog-input"
                 onChange={searchDialog}
                 onBlur={resetSearch}
          />
          <button className="dialog-add" onClick={() => setIsSearch(false)}><img src={add}/></button>
        </div>}
      <div>
        <ul className="dialog-list">
          {dialogs.map(dialog => (
            <li className="dialog-list-item" onClick={() => props.openChat(dialog.id, dialog.name)}>
              <div className="dialog-photo"><img src={avatar}/></div>
              <div className="dialog-name">{dialog.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}