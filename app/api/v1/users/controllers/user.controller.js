const { StatusCodes } = require('http-status-codes')
const { getAllUsers, getOneUsers, createUsers, updateUsers, deleteUsers } = require('../services/user.service')

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

const update = async(req, res, next) => {
    try {
        await updateUsers(req)
        res.status(StatusCodes.OK).json({ status: 'success', message: 'user berhasil diupdate' })
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteUsers(req)
        res.status(StatusCodes.OK).json({ status: 'success', message: 'user berhasil dihapus' })
    } catch (error) {
        next(error)
    }
}
 
module.exports = { index, find, create, update, destroy }