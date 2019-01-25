const express = require('express')
const mongoose = require('./config/database')
const { bookmarksRouter } = require('./app/controllers/bookmarks_controller')
const { Bookmark } = require('./app/models/bookmark')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.json())

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'), {flags: 'a'})
app.use(morgan('combined',{stream: accessLogStream}))

app.get('/:hash', (req, res) => {
    const hash = req.params.hash
    Bookmark.find({hashedUrl: hash})
        .then((bookmark) => {
            res.send(bookmark)
            Bookmark.findOneAndUpdate(bookmark._id,{$push: {clicks: getUseragent(req)}}, {new: true})
                .then(() => {})
                .catch((err) => console.log('Error updating clicks',err))
        })
        .catch((err) => res.send(err))
})

app.get('/', (req, res) => res.send('Welcome to URL Shortner'))

app.use('/bookmarks', bookmarksRouter)

// This part of the code should always be at the end.
app.use('*', function (req, res) {
    res.status(404).send('The webpage you are looking is not found')
})

app.listen(port, () => console.log('Listening on port', port))
