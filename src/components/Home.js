import React from 'react'
import { } from 'react-router-dom'
import Navbar from './Navbar'

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
            <div className='main'>
                <div className='home-main'>
                    <img className='home-picture' src={require('../images/chat.jpg')} alt='picture' />
                    <h1 className='home-content'>
                        Hello There! Welcome to the ChatApp! You need to sign in first.
                    </h1>
                </div>
            </div>
        </>
    )
}
