const Avatar = require('../models/user.avatar.model')
const { BadRequestError, NotfoundError } = require('../../../../errors')
const { uploadToCloudinary, deleteFileFromCloudinary } = require('../../../../utils/cloudinary')

const createAvatar = async(req) => {
    if(!req.file) throw new BadRequestError('please select your file')

    const file = await uploadToCloudinary(req.file.buffer, 'avatar')
    const result = await Avatar.create({ path: file.public_id, url: file.secure_url })

    return result
}

const deleteAvatar = async(req) => {
    const { id } = req.params

    const result = await Avatar.findByIdAndDelete(id)
    if(!result) throw new NotfoundError(`avatar not found`)

    await deleteFileFromCloudinary(result.path)
    return result
}

module.exports = { createAvatar, deleteAvatar }