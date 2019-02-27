require("dotenv").config();

require("isomorphic-fetch");

// const { MongoClient } = require("mongodb"); // When we used Mongo Client
const express = require("express");
const bodyParser = require("body-parser");
const spotifyApi = require("./spotify-api");
// const users = require("./data/users"); // When we used Mongo Client
const logic = require("./logic");
const mongoose = require("mongoose");

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    searchArtists,
    addCommentToArtist,
    listCommentsFromArtist,
    retrieveArtist,
    retrieveAlbums,
    retrieveAlbum,
    retrieveTracks,
    retrieveTrack,
    notFound
} = require("./routes");

const {
    env: {
        DB_URL,
        PORT,
        SPOTIFY_API_TOKEN,
        JWT_SECRET,
        CLIENT_ID,
        CLIENT_SECRET
    },
    argv: [, , port = PORT || 8080]
} = process;

// MongoClient.connect(DB_URL, { useNewUrlParser: true }) // When we used Mongo Client
mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .then(client => {
        // const db = client.db();
        // users.collection = db.collection("users"); // When we used Mongo Client

        spotifyApi.token = SPOTIFY_API_TOKEN;
        spotifyApi.CLIENT_ID = CLIENT_ID;
        spotifyApi.CLIENT_SECRET = CLIENT_SECRET;

        logic.jwtSecret = JWT_SECRET;

        const app = express();

        const jsonBodyParser = bodyParser.json();

        const router = express.Router();

        function cors(req, res, next) {
            res.set("access-control-allow-credentials", true);
            res.set(
                "access-control-allow-headers",
                "Accept, Authorization, Origin, Content-Type, Retry-After"
            );
            res.set(
                "access-control-allow-methods",
                "GET, POST, OPTIONS, PUT, DELETE, PATCH"
            );
            res.set("access-control-allow-origin", "*");
            res.set("access-control-max-age", 604800);

            next();
        }

        router.use(cors);

        router.post("/user", jsonBodyParser, registerUser);

        router.post("/user/auth", jsonBodyParser, authenticateUser);

        router.get("/user/:id", retrieveUser);

        router.get("/artists", searchArtists);

        router.post(
            "/artist/:artistId/comment",
            jsonBodyParser,
            addCommentToArtist
        );

        router.get("/artist/:artistId/comment", listCommentsFromArtist);

        router.get("/artists/:id", retrieveArtist);

        router.get("/artists/:artistId/albums", retrieveAlbums);

        router.get("/albums/:albumId", retrieveAlbum);

        router.get("/albums/:albumId/tracks", retrieveTracks);

        router.get("/tracks/:trackId", retrieveTrack);

        // app.get('*', notFound)

        app.use("/api", router);

        app.listen(port, () => console.log(`server running on port ${port}`));
    })
    .catch(console.error);
