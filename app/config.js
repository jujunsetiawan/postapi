const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    urlDB: process.env.URL_MONGODB,
    cdn_cloud_name: process.env.CDN_CLOUD_NAME,
    cdn_api_key: process.env.CDN_API_KEY,
    cdn_api_secret: process.env.CDN_API_SECRET
}