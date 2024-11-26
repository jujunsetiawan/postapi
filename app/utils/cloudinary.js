const { cdn_api_key, cdn_api_secret, cdn_cloud_name } = require('../config')
const cloudinary = require('cloudinary').v2

cloudinary.config({ cloud_name: cdn_cloud_name, api_key: cdn_api_key, api_secret: cdn_api_secret })

const uploadToCloudinary = (fileBuffer, target) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({folder: `postapp/${target}`, resource_type: 'auto'}, (err, res) => {
            if(err) {
                reject(err)
            } else {
                resolve(res)
            }
        }).end(fileBuffer)
    })
}

const deleteFileFromCloudinary = (name, type) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(name, {resource_type: type ? type : 'image'}, (err, res) => {
            if(err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = { uploadToCloudinary, deleteFileFromCloudinary }