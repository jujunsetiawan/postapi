const User = require('../models/user.model')
const { BadRequestError, NotfoundError } = require("../../../../errors")

const getAllUsers = async(req) => {
    const { limit=10, page=1, username, email } = req.query
    const condition = {}

    if(username) condition['username'] = { $regex: username, options: 'i' }
    if(email) condition['email'] = { $regex: email, options: 'i' }

    const result = await User.find(condition)
    .select('username email bio role avatar')
    .limit(limit)
    .skip(limit * (page - 1))

    const count = await User.countDocuments(condition)
    return { users: result, page: Math.ceil(page/limit), total: count }
}

const getOneUsers = async(req) => {
    const { id } = req.params

    const result = await User.findOne({ _id: id, role: 'user' })
    .select('username email bio role avatar createdAt updatedAt')

    if(!result) throw new NotfoundError(`user dengan id ${id} tidak ditemukan.`)
    return result
}

const createUsers = async(req) => {
    const { username, email, password, confirm_password } = req.body

    if(password !== confirm_password) throw new BadRequestError('password dan confirm password tidak cocok.')

    const result = await User.create({ username, email, password })
    return result
}

const updateUsers = async(req) => {
    const { id } = req.params
    const { username, email, bio, avatar } = req.body

    const result = await User.findOneAndUpdate({ _id: id, role: 'user' }, { username, email, bio, avatar })
    if(!result) throw new NotfoundError(`user dengan id ${id} tidak ditemukan`)

    return result
}

const deleteUsers = async(req) => {
    const { id } = req.params

    const result = await User.findOneAndDelete({ _id: id })
    if(!result) throw new NotfoundError(`user dengan id ${id} tidak ditemukan`)

    return result
}

module.exports = { getAllUsers, getOneUsers, createUsers, updateUsers, deleteUsers }