const { Schema, model } = require('mongoose')

const avatarSchema = Schema(
    {
        path: {
            type: String,
            required: [true, 'path cannot empty']
        },
        url: {
            type: String,
            required: [true, 'url cannot empty']
        }
    },
    { timestamps: true }
)

module.exports = model('Avatar', avatarSchema)