const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = Schema(
    {
        username: {
            type: String,
            minlength: [3, 'username min 3 character'],
            unique: [true, 'username sudah terdaftar'],
            required: true
        },
        email: {
            type: String,
            unique: [true, 'email sudah terdaftar'],
            required: true
        },
        password: {
            type: String,
            minlength: [6, 'password min 6 character'],
            required: true
        },
        bio: {
            type: String
        },
        role: {
            type: String,
            enum: ['super admin', 'user'],
            default: 'user'
        },
        avatar: {
            type: Types.ObjectId,
            ref: 'Avatar'
        }
    },
    { timestamps: true }
)

// userSchema.pre('save', async next => {
//     const User = this
//     if(User.isModified('password')) {
//         User.password = await bcrypt.hash(User.password, 12)
//     }
//     next()
// })

// userSchema.method.comparePassword = async candidatePassword => {
//     const isMatch = await bcrypt.compare(candidatePassword, this.password)
//     return isMatch
// }

module.exports = model('User', userSchema)