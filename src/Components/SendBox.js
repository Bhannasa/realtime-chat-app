import React, { useContext } from 'react'
import userContext from '../context/userContext';
// import "./Styles/sendBox.css"
// const fireBaseApp = require('firebase/app');
// const database = require("firebase/database");

export default function SendBox() {
    const data = useContext(userContext);

    //setting up fire base to get changed message

    //connecting to the firebase

    // const firebaseConfig = {
    //     apiKey: "AIzaSyD6NLsiYtcLTLSFMNUUzvgPMK950WFLGZY",
    //     authDomain: "sampleproject-321915.firebaseapp.com",
    //     projectId: "sampleproject-321915",
    //     storageBucket: "sampleproject-321915.appspot.com",
    //     messagingSenderId: "548884593380",
    //     appId: "1:548884593380:web:710aae9537f5b0fcea4af1"
    // };

    // fireBaseApp.initializeApp(firebaseConfig);
    // console.log("connected");
    // const db = database.getDatabase();

    // database.onChildAdded(database.ref(db, "/"), (msg) => {
    //     console.log(msg);
	// })

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = document.getElementById("message");
        const dt = new Date();
        var elemData = message.value;
        console.log(dt.getTime());
        elemData = elemData.trim();
        if (elemData == "") return;
        const msgData = {
            "message": elemData,
            "time": dt.getTime(),
            "token": data.jwtTokken,
            "user": data.chatWith.username,
            "type": "text",
            "reply": data.replyMsg
        }
        message.value = "";
        try {
            // const chat = await 
            fetch("http://localhost:5000/api/chat/sendMessage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(msgData)
            });
            // const resp = await chat.json();
            // var tableName;

            // if (data.chatWith.username < data.userDetail.username) tableName = data.chatWith.username + data.userDetail.username;
            // else tableName = data.userDetail.username + data.chatWith.username;
            // var curChat = data.chats.get(tableName);
            // console.log("curchat", curChat, tableName);
            data.setreplyMsg(null);
        } catch (err) {
            console.log(err);
        }
	}
    return (
        <div id="sendMsg">
            <form id="whole">
                <input type="text" id="message" placeholder="Type a message" />
                <input type="submit" id="send" value="&#10148;" onClick={sendMessage}/>
            </form>
        </div>
    )
}
