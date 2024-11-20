const router = require('express').Router()
const { index, find, create, update, destroy } = require('../controllers/user.controller')

router.get('/users', index)
router.post('/users', create)
router.get('/users/:id', find)
router.put('/users/:id', update)
router.delete('/users/:id', destroy)

module.exports = router