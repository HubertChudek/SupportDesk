const asyncHandler = require('express-async-handler')

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('All fields have to be filled!')
    }

    res.send('Register route')
})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login route')
})

module.exports = {
    registerUser,
    loginUser
}