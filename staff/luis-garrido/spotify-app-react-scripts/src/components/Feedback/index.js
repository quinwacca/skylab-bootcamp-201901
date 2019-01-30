import React from 'react'
import './index.css'

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>
        <h1>{`${message}`}</h1>
    </section>
}

export default Feedback