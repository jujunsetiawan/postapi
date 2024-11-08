const router = require('express').Router()
const { index } = require('../controllers/user.controller')

router.get('/users', index)

module.exports = router