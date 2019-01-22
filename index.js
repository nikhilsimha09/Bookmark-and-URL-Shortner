const express = require('express')
const mongoose = require('./config/database')
const { bookmarksRouter } = require('./app/controllers/bookmarks_controller')
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to URL Shortner'))

app.use('/bookmarks', bookmarksRouter)

app.listen(port, () => console.log('Listening on port', port))
