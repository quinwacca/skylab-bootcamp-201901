import React, { Component } from 'react';

class Login extends Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterLink = event => {
        event.preventDefault()

        this.props.goToRegister()
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleRegisterLink } = this

        return <section className="login">
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button>Login</button>
            </form>
            <a href="#" onClick={handleRegisterLink}>Register</a>

        </section>
    }
}

export default Login