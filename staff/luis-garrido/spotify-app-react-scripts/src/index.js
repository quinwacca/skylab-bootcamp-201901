import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './vendor/spotify-api/1.0.0'

spotifyApi.token = 'BQBHWp25Oh0lui2Gu9wQji1xoPs_bbxSuvuVE9kWOYLlyqtfZC-O4Y9YjizzyOaAvBZzVho3JJGdgUUsRhifwU2uuepqdviAgOHhwlEGqZDifcTsHTRdi8Rg7AMPbTgI-a8a5z_vbiWLncf31mit6XeRFnxMtA'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
