const getAllUsers = async(req) => {
    const { keyword, username, email, phone } = req.query

    console.log({keyword, username, email, phone});

    const result = [{ id: 1, username: 'test', email: 'testing@gmail.com', phone: '123213213' }]
    return result
}

const getOneUsers = async(req) => {

}

module.exports = { getAllUsers, getOneUsers }