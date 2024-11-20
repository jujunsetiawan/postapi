const { StatusCodes } = require('http-status-codes')
const { getAllUsers, getOneUsers, createUsers } = require('../services/user.service')

const index = async(req, res, next) => {
    try {
        const result = await getAllUsers(req)
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOneUsers(req)
        res.status(StatusCodes.OK).json({ status: 'succcess', user: result })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const result = await createUsers(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', user: result })
    } catch (error) {
        next(error)
    }
}
 
module.exports = { index, find, create }