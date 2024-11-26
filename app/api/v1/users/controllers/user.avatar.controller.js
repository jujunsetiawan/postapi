const { createAvatar, deleteAvatar } = require('../services/user.avatar.service')
const { StatusCodes } = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createAvatar(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', avatar: result })
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteAvatar(req)
        res.status(StatusCodes.OK).json({ status: 'success', message: 'avatar deleted successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, destroy }