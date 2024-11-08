const { getAllUsers, getOneUsers } = require('../services/user.service')

const index = async(req, res, next) => {
    try {
        const result = await getAllUsers(req)
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

module.exports = { index }