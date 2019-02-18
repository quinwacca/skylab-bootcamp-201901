const logic = require('../../logic')
// const { renderPage, pullFeedback } = require('../helpers')

module.exports = (req, res) => {
    
    const { params: { userId }, headers: { authorization } } = req
    
    const auth = authorization.split(' ')[1]
    try {

        // const feedback = pullFeedback(req)
        logic.retrieveUser(userId, auth)
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