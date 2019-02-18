const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password } } = req
    try {
        logic.registerUser(name, surname, email, password)
        .then(res.json.bind(res))
        .catch(({ message }) => {
            res.status(401).json({
                error: message
            })
        })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}