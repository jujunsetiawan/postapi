const router = require('express').Router()
const { index, find, create } = require('../controllers/user.controller')

router.get('/users', index)
router.post('/users', create)
router.get('/users/:id', find)

module.exports = router