import React, { Component } from 'react';

import Login from './components/Login'
import logic from './logic'
import Register from './components/Register'
import Search from './components/Search'
import Artists from './components/Artists'
import Albums from './components/Albums'
import Tracks from './components/Tracks'

class App extends Component {
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

  
//   handleArtistSearch = query => {
     
//     logic.searchArtists(query)
//         .then(artists => this.updateArtists(artists))
//         .catch(err => console.error(err.message))
// }
  
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
          // console.error(error.message)
      }
  }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
      try {
          logic.register(name, surname, email, password, passwordConfirmation, user => {
              this.setState({ loginPanel: true, registerPanel: false })
          })
      } catch ( { message } ) {
          // console.error(error.message)
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

export default App;
