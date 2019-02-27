const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { trackId } } = req

    try {
        logic.retrieveTrack(trackId)
            // .then(artists => res.json(artists))
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}