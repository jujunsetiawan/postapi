const { StatusCodes } = require('http-status-codes')
 
module.exports = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ status: 'error', message: 'route dose not exist' })