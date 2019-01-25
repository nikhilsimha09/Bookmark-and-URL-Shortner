const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/bookmark')
const newUseragent = require('useragent')
// const { userData } = require('../../userData')

router.get('/', (req, res) => {
    Bookmark.find()
        .then((bookmarks) => res.send(bookmarks))
        .catch((err) => res.send(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Bookmark.findOne(id)
        .then((bookmark) => res.send(bookmark))
        .catch((err) => res.send(err))
})

router.post('/', (req, res) => {
    const data = req.body
    const bookmark = new Bookmark(data)
    bookmark.save()
        .then((bookmark) => res.send(bookmark))
        .catch((err) => res.send(err))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, body)
        .then((bookmark) => res.send(bookmark))
        .catch((err) => res.send(err))
})

router.get('/tags/:tags', (req, res) => {
    const tags = req.params.tags.split(',')
    Bookmark.find({tags: {'$in': tags}})
        .then((bookmark) => res.send(bookmark))
        .catch((err) => res.send(err))
})


router.delete('/:id', (req, res) =>{
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
        .then((bookmark) => res.send(bookmark))
        .catch((err) => res.send(err))
})

function getUseragent(reqData){
    const agent = newUseragent.parse(reqData.headers['user-agent'])
    const userInfo = {}
    userInfo.ipAddress = reqData.connection.remoteAddress,
    userInfo.browserName = agent.toAgent(),
    userInfo.osType = agent.os.toString(),
    userInfo.deviseType = agent.device.toString()
    return userInfo
}

module.exports = {bookmarksRouter: router}