spotifyApi.token = 'BQCDSpiimpNNbmz1STjxWr3Fs36b8RxGjWaxt6PnxCSyWoUqiS2swPdISzM0x-Op3aSR5_q_XZ28ImdLcEd3y09iJoUBX3zO25-RzA86qxxlUQ-2eO7XYtZmLMiMXGsxnmhS8SvY6V8Pd8uisXzYg1DsZ8grCw'
let artistsRes = null

class Search extends React.Component {
    state = { query: '' }

    handleQueryInput = event => {
        this.setState({ query : event.target.value })
    }
    
    handleQuerySubmit = event => {
        const { state: { query }, props: { handleSearch } } = this

        event.preventDefault()

        handleSearch(query)
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
    state = { artistsList: '' }
    
    handleArtists = (artist) => {
        console.log({ state: artists[2].name })
        // this.artistsList = artists.forEach(({ id, name, images }) => {
            // console.log(this)
            //     const image = images.length!==0?images[0].url:"styles/no-image.png"
            //     return <li data-id={id}>
            //         <div className="cards">
            //             <div className="cards__image">
            //                 <img src={image} height="100%">
            //             </div>
            //             <div className="cards__name">
            //                 <p>{name}</p>
            //             </div>
            //     </div>
            // </li>
            // })
        }
    render() {
        const { handleSearch } = this
        
        return <section className="results">
            <ul className="list">
            {/* {artists} */}
            </ul>
        </section>
    }
}

class App extends React.Component {

    updateArtists = artists => {
        if (artists) {
            console.log(artists[1].name)
            artistsRes = artists
            console.log(artistsRes[2].name)
        }
        else {console.log("yo")}
    }

    handleSearch = query => {
        try {
            logic.searchArtists(query, function(error, artists) {
                if (error) console.error = error.message
                else {
                    console.log(artists[0].name)
                    this.updateArtists(artists)
                }
            }.bind(this))
        } catch(err) {
    
        }
    }

    // handleArtistSelection =

    // handleAlbumSelection =
    render() {
       
        const { handleSearch } = this


        return <main className="container-fluid p-3">
            <Search handleSearch={handleSearch}/>
            {artistsRes && console.log("yo")}
            {artistsRes}
            <Artists>
                {artistsRes}
            </Artists>
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))