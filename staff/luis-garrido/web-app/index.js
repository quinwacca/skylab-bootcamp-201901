const express = require("express");
const bodyParser = require("body-parser");
const logic = require("./src/logic");

const {
    argv: [, , port = 8080]
} = process;

const app = express();

const formBodyParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

let feedback = "";

app.get("/register", (req, res) => {
    res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Register</h2>
        <form method="POST" action="/register">
        <input name="name" type="text" placeholder="name" required>
        <input name="surname" type="text" placeholder="surname" required>
        <input name="email" type="email" placeholder="email" required>
        <input name="password" type="password" placeholder="password" required>
        <input name="passwordConfirm" type="password" placeholder="confirm password" required>
        <button type="submit">Register</button>
        </form>
        <a href="/login">To Login</a>
        ${
            feedback
                ? `<section class="feedback feedback--warn">
            ${feedback}
        </section>`
                : ""
        }
    </section>
</body>
</html>`);
});

app.get("/login", (req, res) => {
    res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="login">
        <h2>Login</h2>
        <form method="POST" action="/login">
        <input name="email" type="email" placeholder="email" required>
        <input name="password" type="password" placeholder="password" required>
        <button type="submit">Login</button>
        </form>
        <a href="/register">To Register</a>
        ${
            feedback
                ? `<section class="feedback feedback--warn">
            ${feedback}
        </section>`
                : ""
        }
    </section>
</body>
</html>`);
});

app.post("/register", formBodyParser, (req, res) => {
    const {
        body: { name, surname, email, password, passwordConfirm }
    } = req;

    try {
        logic
            .registerUser(name, surname, email, password, passwordConfirm)
            .then(() =>
                res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Registration confirmation</h2>
        Ok, user <strong>${email}</strong> successfully registered, please proceed to <a href="/login">login</a>.
        </form>
    </section>
</body>
</html>`)
            )
            .catch(({ message }) => {
                feedback = message;

                res.redirect("/register");
            });
    } catch ({ message }) {
        feedback = message;

        res.redirect("/register");
    }
});

app.post("/login", formBodyParser, (req, res) => {
    const {
        body: { email, password }
    } = req;

    try {
        logic
            .logInUser(email, password)
            .then(() => res.redirect("/home"))
            .catch(({ message }) => {
                feedback = message;

                res.redirect("/register");
            });
    } catch ({ message }) {
        feedback = message;

        res.redirect("/register");
    }
});

app.get("/home", (req, res) => {
    if (!logic.isUserLoggedIn) return res.redirect("/login");
    res.send(`<html>
    <head>
        <title>HELLO WORLD</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>HELLO WORLD</h1>
        <section class="login">
            <h2>LOGGED!</h2>
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
            HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! HULIO! 
        </section>
    </body>
    </html>`);
});

// TODO get and post login
// TODO get home (must control user is logged in)

app.listen(port, () => console.log(`server running on port ${port}`));
