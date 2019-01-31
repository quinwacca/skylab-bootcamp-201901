import React, { Component } from 'react';

class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        
        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        console.log(name, surname)
        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleFormSubmit, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput } = this

        return <section className="register">
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" onChange={handleNameInput} />
                <input type="text" name="surname" onChange={handleSurnameInput} />
                <input type="email" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <input type="password" name="passwordConfirmation" onChange={handlePasswordConfirmationInput} />
                <button>Register</button>            
            </form>
        </section>

    }

}

export default Register