spotifyApi.token = 'BQCeprrzjL_FOUc_0yzLSB71SbeGtjJDn3vOhtZ7XwW9YwvgFJB9UJ8judIN5JgR-roIdmjZP6S50F4HmCLcLo5cMgnEpgo6xvXZ96vYT_SeyFR_LChqjIGUx5mzvSa5o9xHDpCFxAuKSNtie1JYPIl9MtbhhA'
let artistsRes = null
let albumsRes = null
let tracksRes = null
let cover = null
let discName = null

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
    state = { id: '' , artistResults: '' }

    handleArtistSelection = id => {
        const { props: { handleAlbumSearch } } = this

        handleAlbumSearch(id)
    }

    pickArtist = pick => {
        this.setState({ artistResults: pick})
    }

    render() {
        const { handleArtistSelection } = this

        const res = artistsRes.map(({ name, images, id }) => {
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
    state = { id: '' }

    handleAlbumSelection = (id, image, name) => {
        const { props: { handleTracksSearch } } = this
        cover = image
        discName = name
        handleTracksSearch(id)
    }

    render() {
        const { handleAlbumSelection } = this
    
        const res = albumsRes.map(({ name, images, id }) => {
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
        const res = tracksRes.map(({ id, duration_ms, preview_url, name }) => {
            const time = parseInt(duration_ms/(1000*60)%60) + ":" + (parseInt((duration_ms/1000)%60)>9?parseInt((duration_ms/1000)%60):"0"+parseInt((duration_ms/1000)%60))
            return (<li key={id} data-preview={preview_url}>
                <audio controls>
                    <source src={preview_url} type="audio/mpeg" />Your browser does not support the audio tag.</audio> {time} - {name}
                </li>)
        })

        return <section className="trackList container">
            <div className="trackListCover">
                <div className="trackListCover__image">
                    <img src={cover} className="cards__image" height="100%"/>
                </div>
                <div className="trackListCover__name">
                        <p>{discName}</p>
                </div>
            </div>
            <ul>{res}</ul>
        </section>
    }

}

class App extends React.Component {
    state = { artists: null , albums: null , tracks: null }

    updateArtists = artists => {
        if (artists) {
            artistsRes = artists
            this.setState({ artists, albums: null , tracks: null })
        }
        else {console.log("yo")}
    }

    updateAlbums = albums => {
        if (albums) {
            albumsRes = albums
            artistsRes = null
            tracksRes = null
            this.setState({ albums , artists: null , tracks: null })
        }
        else {console.log("albumsfail")}
    }

    updateTracks = tracks => {
        if (tracks) {
            tracksRes = tracks
            albumsRes = null
            artistsRes = null
            this.setState({ tracks, artists: null, albums: null })
        }
        else { console.log("tracksfail") }
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

    handleTracksSearch = id => {
        try {
            logic.retrieveTracks(id, function(error, tracks) {
                if (error) console.error = error.message
                else {
                    this.updateTracks(tracks)
                }
            }.bind(this))
        } catch(err) {

        }
    }

    // handleAlbumSelection =
    render() {
       
        const { handleArtistSearch, handleAlbumSearch, handleTracksSearch} = this

        return <main className="container-fluid p-3">
            <Search handleArtistSearch={handleArtistSearch}/>
            {this.state.artists && <Artists handleAlbumSearch={handleAlbumSearch}/>}
            {this.state.albums && <Albums handleTracksSearch={handleTracksSearch}/>}
            {this.state.tracks && <Tracks />}
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))