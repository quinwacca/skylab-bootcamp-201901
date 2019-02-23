const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req
    debugger
    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(id => res.json({ status: "OK", data: { id } }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}