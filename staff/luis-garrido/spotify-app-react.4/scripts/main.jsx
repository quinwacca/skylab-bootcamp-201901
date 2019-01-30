spotifyApi.token = 'BQCYsHgY6rMPbB-9XuWCOagtA8_q5b1ArucOC6NdjlYHzYP7nTAt5C9_RogyPdRNGsWbfj6gZ5X9uOOWSI5387aW_KNa_zAlr9NQhteppVH0U8xoS-npRjOXcZ3L8Iqq5zz-Kt8AEDrMeo6IpxmUgJg9O_Pd3A'

class Search extends React.Component {
    state = { query: '' }

    handleQueryInput = event => {
        this.setState({ query : event.target.value })
    }
    
    handleQuerySubmit = event => {
        const { state: { query }, props: { handleArtistSearch } } = this

        event.preventDefault()

        handleArtistSearch(query)
    }

    render() {
        const { handleQueryInput, handleQuerySubmit } = this

        return <section className="search">
            <form onSubmit={handleQuerySubmit} className="searchingForm">
                <button type="submit" className="searchingForm__button">Search</button>
                <input onChange={handleQueryInput} type="text" name="query" className="searchingForm__input" placeholder="an artist..." autoFocus autoComplete="off" />
            </form>
        </section>
    }
}

class Artists extends React.Component {
    state = { id: '' }

    handleArtistSelection = id => {
        this.props.handleAlbumSearch(id)
    }

    render() {
        const { handleArtistSelection } = this

        const res = this.props.artistsLi.map(({ name, images, id }) => {
            const image = images.length!==0?images[0].url:"styles/no-image.png"
            return (<li key={id} onClick={() => handleArtistSelection(id)}>
                    <div className="cards">
                        <div className="cards__image">
                            <img src={image} height="100%" />
                        </div>
                        <div className="cards__name">
                            <p>{name}</p>
                        </div>
                    </div>
                </li>)})
        
        return <section className="results">
            <ul className="list">{res}</ul>
        </section>
    }
}

class Albums extends React.Component {

    handleAlbumSelection = (id, image, name) => {
        
        this.props.handleTracksSearch(id, image, name)
    }

    render() {
        const { handleAlbumSelection } = this
    
        const res = this.props.albumsLi.map(({ name, images, id }) => {
            const image = images.length!==0?images[0].url:"styles/no-image.png"
            return (<li key={id} onClick={() => handleAlbumSelection(id, image, name)}>
                <div className="cards">
                    <div className="cards__image">
                        <img src={image} height="100%" />
                    </div>
                    <div className="cards__name">
                        <p>{name}</p>
                    </div>
                </div>
            </li>)})

        return <section className="results">
            <ul className="list">{res}</ul>
        </section>
    }
}

class Tracks extends React.Component {
    
    render() {
        const res = this.props.tracksLi.map(({ id, duration_ms, preview_url, name }) => {
            const time = parseInt(duration_ms/(1000*60)%60) + ":" + (parseInt((duration_ms/1000)%60)>9?parseInt((duration_ms/1000)%60):"0"+parseInt((duration_ms/1000)%60))
            return (<li key={id} data-preview={preview_url}>
                <audio controls>
                    <source src={preview_url} type="audio/mpeg" controls />Your browser does not support the audio tag.</audio> {time} - {name}
                </li>)
        })

        return <section className="trackList container">
            <div className="trackListCover">
                <div className="trackListCover__image">
                    <img src={this.props.cover} className="cards__image" height="100%"/>
                </div>
                <div className="trackListCover__name">
                        <p>{this.props.albumName}</p>
                </div>
            </div>
            <ul>{res}</ul>
        </section>
    }
}

class Login extends React.Component {
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

class Register extends React.Component {
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

class App extends React.Component {
    state = {
        loggedUser: null,
        loginPanel: true,
        registerPanel: false,
        artistsSt: null, 
        albumsSt: null, 
        tracksSt: null,
        cover: null,
        albumName: null,
        loginFeedback: ''
    }

    updateArtists = artists => {
        if (artists) {
            this.setState({ artistsSt: artists, albumsSt: null , tracksSt: null })
        }
        else {console.log("artistsFail")}
    }

    updateAlbums = albums => {
        if (albums) {
            this.setState({ albumsSt: albums , artistsSt: null , tracksSt: null })
        }
        else {console.log("albumsFail")}
    }

    updateTracks = (tracks, image, name) => {
        if (tracks) {
            this.setState({ tracksSt: tracks, artistsSt: null, albumsSt: null, cover: image, albumName: name })
        }
        else { console.log("tracksFail") }
    }

    handleArtistSearch = query => {
        try {
            logic.searchArtists(query, function(error, artists) {
                if (error) console.error = error.message
                else {
                    this.updateArtists(artists)
                }
            }.bind(this))
        } catch(err) {
            console.error(err.message)
        }
    }

    handleAlbumSearch = id => {
        try {
            logic.retrieveAlbums(id, function(error, albums) {
                if (error) console.error = error.message
                else {
                    this.updateAlbums(albums)
                }
            }.bind(this))
        } catch(err) {

        }
    }

    handleTracksSearch = ( id, image, name ) => {
        try {
            logic.retrieveTracks(id, function(error, tracks) {
                if (error) console.error = error.message
                else {
                    this.updateTracks(tracks, image, name)
                }
            }.bind(this))
        } catch(err) {

        }
    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                this.setState({ loginPanel: false, loggedUser: user })
            })
        } catch ({ message }) {
            console.error(error.message)
        }
    }

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.register(name, surname, email, password, passwordConfirmation, user => {
                this.setState({ loginPanel: true, registerPanel: false })
            })
        } catch ( { message } ) {
            console.error(error.message)
        }
    }

    goToRegister = () => {
        this.setState({ loginPanel: false, registerPanel: true })
    }

    render() {
       
        const { handleArtistSearch, handleAlbumSearch, handleTracksSearch, handleLogin, handleRegister, goToRegister } = this
        const { state: { loggedUser, loginPanel, registerPanel, artistsSt, albumsSt, tracksSt, cover, albumName } } = this

        return <main className="container-fluid p-3">
            {loginPanel && <Login onLogin={handleLogin} goToRegister={goToRegister}/>}
            {registerPanel && <Register onRegister={handleRegister}/>}
            {loggedUser && <section><Search handleArtistSearch={handleArtistSearch}/><h1>{loggedUser.name}</h1></section>}
            {artistsSt && <Artists artistsLi={artistsSt} handleAlbumSearch={handleAlbumSearch}/>}
            {albumsSt && <Albums albumsLi={albumsSt} handleTracksSearch={handleTracksSearch}/>}
            {tracksSt && <Tracks cover={cover} albumName={albumName} tracksLi={tracksSt}/>} 
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))