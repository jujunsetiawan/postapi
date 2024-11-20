const User = require('../models/user.model')
const { BadRequestError, NotfoundError } = require("../../../../errors")

const getAllUsers = async(req) => {
    const { limit=10, page=1, username, email } = req.query
    const condition = {}

    if(username) condition['username'] = { $regex: username, options: 'i' }
    if(email) condition['email'] = { $regex: email, options: 'i' }

    const result = await User.find(condition)
    .limit(limit)
    .skip(limit * (page - 1))

    const count = await User.countDocuments(condition)
    return { users: result, page: Math.ceil(page/limit), total: count }
}

const getOneUsers = async(req) => {
    const { id } = req.params

    const result = await User.findOne({ id, role: 'user' })
    if(!result) throw new NotfoundError(`user dengan id ${id} tidak ditemukan.`)

    return result
}

const createUsers = async(req) => {
    const { username, email, password } = req.body

    const result = await User.create({ username, email, password })
    return result
}

const updateUsers = async(req) => {

}

const deleteUsers = async(req) => {

}

module.exports = { getAllUsers, getOneUsers, createUsers, updateUsers, deleteUsers }