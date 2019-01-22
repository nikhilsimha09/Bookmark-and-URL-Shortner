const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/bookmark_url_shortner', { useNewUrlParser: true})
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('Error connecting to DB', err))

module.exports = { mongoose }       