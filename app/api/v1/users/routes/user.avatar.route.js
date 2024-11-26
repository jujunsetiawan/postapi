const router = require('express').Router()
const upload = require('../../../../middleware/multer')
const { create, destroy } = require('../controllers/user.avatar.controller')

router.post('/avatars', upload.single('avatar'), create)
router.delete('/avatars/:id', destroy)

module.exports = router