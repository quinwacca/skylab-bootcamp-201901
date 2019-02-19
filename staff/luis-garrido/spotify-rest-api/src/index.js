require("dotenv").config();

require("isomorphic-fetch");

const express = require("express");
const bodyParser = require("body-parser");

const {
    register,
    authenticate,
    retrieve,
    notFound,
    searchArtist,
    retrieveArtist,
    retrieveAlbums,
    retrieveAlbum,
    retrieveTracks,
    retrieveTrack
} = require("./routes");

const {
    env: { PORT, SPOTIFY_API_TOKEN },
    argv: [, , port = PORT || 8080]
} = process;

const app = express();

const jsonBodyParser = bodyParser.json();

const spotifyApi = require("./spotify-api");
spotifyApi.token = SPOTIFY_API_TOKEN;

app.post("/register", jsonBodyParser, register.post);

app.post("/authenticate", jsonBodyParser, authenticate.post);

app.get(`/retrieve/:userId`, retrieve.get);

app.get("/search/:query", searchArtist.get);

app.get("/artist/:artistId", retrieveArtist.get);

app.get("/artist/:artistId/albums", retrieveAlbums.get);

app.get("/album/:albumId", retrieveAlbum.get);

app.get("/album/:albumId/tracks", retrieveTracks.get);

app.get("/track/:trackId", retrieveTrack.get);

app.get("/*", notFound.get);

app.listen(port, () => console.log(`server running on port ${port}`));
