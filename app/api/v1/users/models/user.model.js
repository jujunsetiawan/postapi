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
            type: String,
            default: ""
        },
        role: {
            type: String,
            enum: ['super admin', 'user'],
            default: 'user'
        },
        avatar: {
            type: Types.ObjectId,
            ref: 'Avatar',
            default: null
        }
    },
    { timestamps: true }
)

userSchema.pre('save', async function(next) {
    const User = this
    if(User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = model('User', userSchema)