const Clarifai = require('clarifai');
const app = new Clarifai.App( {
    apiKey: '05801666535849c18dcb0813448cb880'
  });
const handleAPICall = (req, res ) => {
    app.models
    .predict( 'c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then( data => {
        res.json(data)
    })
    .catch( err => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then ( entries => {
            res.json(entries[0]);
        })
        .catch( err => res.status(400).json('Unable to get entries'))

}

module.exports = {
    handleImage
}