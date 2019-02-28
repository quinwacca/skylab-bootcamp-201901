'use strict'

import React, { useState } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import LanguageSelector from '../LanguageSelector'
import Register from '../Register'
import Login from '../Login'
import Home from '../Home'
import i18n from '../../i18n'
import logic from '../../logic'
import './index.sass'

function App(props) {
// class App extends Component {
    // state = { selectedLanguage: 'en', loggedIn: logic.isUserLoggedIn, loginFeedback: null, registerFeedback: null }
    // const [ query, setQuery ] = useState('')
    const [ selectedLanguage, setSelectedLanguage ] = useState('en')
    const [ loginFeedback, setLoginFeedback ] = useState(null)
    const [ registerFeedback, setRegisterFeedback ] = useState(null)

    const handleLanguageSelected = event => setSelectedLanguage(event.target.value)

    // handleLanguageSelected = event => {
    //     this.setState({
    //         selectedLanguage: event.target.value
    //     })
    // }

    const handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => props.history.push('/login'))
                .catch(({ message }) => setRegisterFeedback(message))
        } catch ({ message }) {
            setRegisterFeedback(message)
        }
    }

    // handleRegister = (name, surname, email, password, passwordConfirmation) => {
    //     try {
    //         logic.registerUser(name, surname, email, password, passwordConfirmation)
    //             .then(() => this.props.history.push('/login'))
    //             .catch(({ message }) => this.setState({ registerFeedback: message }))
    //     } catch ({ message }) {
    //         this.setState({ registerFeedback: message })
    //     }
    // }

    const handleLogin = (email, password) => {
        try {
            logic.logInUser(email, password)
                .then(() => props.history.push('/'))
                .catch(({ message }) => setLoginFeedback(message))
        } catch ({ message }) {
            setLoginFeedback(message)
        }
    }

    // handleLogin = (email, password) => {
    //     try {
    //         logic.logInUser(email, password)
    //             .then(() => this.props.history.push('/'))
    //             .catch(({ message }) => this.setState({ loginFeedback: message }))
    //     } catch ({ message }) {
    //         this.setState({ loginFeedback: message })
    //     }
    // }

    const title = <h1>{i18n[selectedLanguage].title}</h1>

    return (
        <main className="app">
            <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
            {title}
            <Route path="/register" render={() => <Register title={i18n[selectedLanguage].registerTitle} onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route path="/login" render={() => <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} feedback={loginFeedback} />} />
            <Route path="/" render={() => logic.isUserLoggedIn ? <Home language={selectedLanguage} /> : <section><Link to="/login">Login</Link> or <Link to="/register">Register</Link></section>} />
        </main>
    )
}

export default withRouter(App)