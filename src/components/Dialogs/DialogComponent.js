import React from "react";
import './Dialog.css'

export default function DialogComponent () {
    const userId = parseInt(localStorage.getItem('userId'));
    const data = [
        {id: 0, Name: "Name_1"},
        {id: 1, Name: "Name_2"},
        {id: 2, Name: "Name_3"},
        {id: 3, Name: "Name_4"}
    ]
    return(
        <div className="dialog-wrapper">
                <div>
                    <input type="text"
                           placeholder="Search"
                           className="dialog-input"
                    />
                </div>
                <div>
                    <ul className="dialog-list">
                        {data.map(message => (
                            <li className="dialog-list-item">{message.Name}</li>
                        ))}
                    </ul>
                </div>
        </div>
    )
}