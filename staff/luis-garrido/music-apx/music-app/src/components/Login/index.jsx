"use strict";

import React, { useState } from "react";
import Feedback from "../Feedback";

// class Login extends Component {
// function Login({ onLogin, title, feedback }) {
const Login = ({ onLogin, title, feedback }) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // state = { email: '', password: '' }

    const handleEmailInput = event => setEmail(event.target.value);
    // handleEmailInput = event => this.setState({ email: event.target.value })

    const handlePasswordInput = event => setPassword(event.target.value);
    // handlePasswordInput = event => this.setState({ password: event.target.value })

    const handleFormSubmit = event => {
        event.preventDefault();

        onLogin(email, password);
    };
    // handleFormSubmit = event => {
    //     event.preventDefault()

    //     const { state: { email, password }, props: { onLogin } } = this

    //     onLogin(email, password)
    // }

    return (
        <section className="login">
            <h2>{title}</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input
                    type="password"
                    name="password"
                    onChange={handlePasswordInput}
                />
                <button>Login</button>
            </form>

            {feedback && <Feedback message={feedback} level="warn" />}
        </section>
    );
};

export default Login;
