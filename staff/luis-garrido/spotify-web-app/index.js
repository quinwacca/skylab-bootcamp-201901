require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify-api')

const { REACT_APP_SPOTIFY_API_TOKEN } = process.env

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase',
    resave: true,
    saveUninitialized: true,
    // store: new FileStore({
    //     path: './.sessions'
    // })
}))

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './src/components')

const formBodyParser = bodyParser.urlencoded({ extended: false })

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}

function renderPage(content) {
    return `<html>
<head>
    <title>HELLO WORLD!</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD! 🤡</h1>
    ${content}
</body>
</html>`
}

app.get('/', (req, res) => {
    res.redirect('search')
})

app.get('/register', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/search')
    } else {
        const feedback = pullFeedback(req)

        res.render('register', { feedback })
    }
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req

    const logic = logicFactory.create(req)

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => res.render('register-confirm', {email}))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/search')
    } else {
        const feedback = pullFeedback(req)

        res.render('login', { feedback })
    }
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req

    const logic = logicFactory.create(req)

    try {
        logic.logInUser(email, password)
            .then(() => res.redirect('/search'))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/login')
    }
})

app.get('/search', (req, res) => {
    try {
        const { session: { feedback, artists, albums, tracks } } = req

        const logic = logicFactory.create(req)

        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(({ name }) => res.render('search', {feedback, name, artists, albums, tracks}))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/search')
                })
        else res.redirect('/login')
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/search')
    }
})

// app.get('/search/:query', formBodyParser, (req, res) => {
//     req.session.albums = null
//     req.session.tracks = null
    
//     try {
//         const { params: { query } , session: { feedback, artists, albums, tracks } } = req
//         console.log(query)
        
//         const logic = logicFactory.create(req)
//         console.log(query)
//         logic.searchArtists(query)
//             .then((artists) => {
//                 req.session.artists = artists
    
//                 res.render('search', {feedback, name, artists, albums, tracks})
//                 // res.redirect('/search')
//             })
//             .catch(({ message }) => {
//                 req.session.feedback = message
    
//                 res.redirect('/login')
//                 })
//         } catch ({ message }) {
//             req.session.feedback = message
    
//             res.redirect('/login')
//         }

// })

app.post('/search', formBodyParser, (req, res) => {
    const { body: { query, artist, album } } = req
    const logic = logicFactory.create(req)
    if (album) {
        req.session.albums = null
        try {
            logic.retrieveTracks(album)
                .then((tracks) => {
                    req.session.tracks = tracks
                    res.redirect('/search')
                })
                .catch(({ message }) => {
                    req.session.feedback = message
    
                    res.redirect('/login')
                })
        } catch ({ message }) {
            req.session.feedback = message
    
            res.redirect('/login')
        }
    }
    if (artist) {
        req.session.artists = null
        try {
            logic.retrieveAlbums(artist)
                .then((albums) => {
                    req.session.albums = albums
                    res.redirect('/search')
                })
                .catch(({ message }) => {
                    req.session.feedback = message
    
                    res.redirect('/login')
                })
        } catch ({ message }) {
            req.session.feedback = message
    
            res.redirect('/login')
        }
    }
    if(query) {
        req.session.albums = null
        req.session.tracks = null
        try {
            logic.searchArtists(query)
                .then((artists) => {
                    req.session.artists = artists
                    res.redirect('/search')
                })
                .catch(({ message }) => {
                    req.session.feedback = message
    
                    res.redirect('/login')
                })
        } catch ({ message }) {
            req.session.feedback = message
    
            res.redirect('/login')
        }
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})

app.get('*', (req, res) => res.send(404, renderPage(`<section class="not-found">
        <h2>NOT FOUND</h2>

        Go <a href="/">Home</a>
    </section>`)))


app.listen(port, () => console.log(`server running on port ${port}`))