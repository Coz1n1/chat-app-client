import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'

const socket = io.connect("https://cors-anywhere.herokuapp.com/https://chat-app-server-production-4db6.up.railway.app")

export default function Logged() {

    const [user, setUser] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [everyMessage, setEveryMessage] = useState([])
    const [joined, setJoined] = useState(false)

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("https://cors-anywhere.herokuapp.com/https://chat-app-server-production-4db6.up.railway.app/login").then((response) => {
            if (response.data.log === true) {
                console.log(response.data.user.name)
                setUser(response.data.user.name)
            }
        })
    })

    const send = async () => {
        if (room !== "") {
            if (message !== "") {
                const all = {
                    room: room,
                    name: user,
                    message: message,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                }
                await socket.emit("send", all)
                setEveryMessage((list) => [...list, all])
                setMessage('')
            }
        } else {
            window.alert("You need to join the room first :)")
        }
    }

    const joinRoom = () => {
        if (room !== "") {
            socket.emit('join', room)
            setJoined(!joined)
        }else {
            window.alert("Enter room name first :)")
        }
    }

    const leaveRoom = () => {
        setEveryMessage([])
        setRoom('')
        socket.emit('leave', room)
        setJoined(!joined)
    }

    useEffect(() => {
        socket.on("getting", (data) => {
            console.log(data)
            setEveryMessage((list) => [...list, data])
        })
    }, [socket])

    return (
        <>
            <div className='header-logged'>
                <h1 className='opening-text'>Hello: {user}</h1>
                <a href='/' className='logout'>Logout</a>
            </div>
            <div>
                <div className='messages'>
                    {
                        joined ?
                            <>
                                <div className='room-label'>
                                    {"You just joined room: " + room}
                                </div>
                            </>
                            :
                            <>
                                <div className='room-label'>
                                    {"You didn't join any room yet"}
                                </div>
                            </>
                    }
                    <ScrollToBottom className='scroll'>
                    {everyMessage.map((e) => {
                        return (
                            <div className='chat' id={user === e.name ? "author" : "guest"}>
                                <div className='mess-content'>
                                    <div className='chat-message'>
                                        <p className='text'>
                                        {e.message}
                                        </p>
                                    </div>
                                    <div className='user-info'>
                                        <p className='user-info-name'>
                                            {e.name}  
                                        </p>
                                        <p className='hour-info'>
                                            {e.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </ScrollToBottom>
                </div>
                <input placeholder='Write a message...' type='text' id='message-input' value={message} onChange={(e) => { setMessage(e.target.value) }}></input>
                <button type='button' id='send' onClick={send}>Send</button>
            </div>
            <div className='room-management'>
                {
                    joined ?
                        <>
                            <button onClick={leaveRoom} type='button' id='leaveRoomButton'>Leave</button>
                        </>
                        :
                        <>
                            <div className='join-room-place'>
                            <input placeholder='Enter room name...' type='text' id='room' onChange={(e) => { setRoom(e.target.value) }}></input>
                            <button onClick={joinRoom} type='button' id='rButton'>Join</button>
                            </div>
                        </>
                }
            </div>
        </>
    )
}
