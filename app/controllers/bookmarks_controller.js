const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/bookmark')

router.get('/', (req, res) => {
    Bookmark.find()
        .then((bookmarks) => res.send(bookmarks))
        .catch((err) => res.send(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Bookmark.find({$or: [{id:id}, {hashedUrl: id}]})
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

// router.get('/:hash', (req, res) => {
//     const hash = req.params.hash
//     //console.log(hash)
//     Bookmark.find({hashedUrl: 'vpcA6'})
//         .then((bookmark) => res.send(bookmark))
//         .catch((err) => res.send(err))
// })

// router.get('/tags/:name', (req, res) => {
//     const name = req.params.name
//     Bookmark.find({tags:name})
//         .then((bookmark) => res.send(bookmark))
//         .catch((err) => res.send(err))
// })

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

module.exports = {bookmarksRouter: router}