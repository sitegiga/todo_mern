import React from 'react'
import './home.css'
function home() {
    return (
        <div className='home d-flex justify-content-center align-items-center'>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className='text-center'>Organize Your <br /> work and life, finally.</h1>
                <p>Become focused, Organize, and calm with <br /> todo app. The world's #1 task manger app</p>
                <button className='home-btn p-2'>Make Todo list</button>
            </div>
        </div>
    )
}

export default home
