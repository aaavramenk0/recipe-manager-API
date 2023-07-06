const db = require('../models');
const User = db.user;

const jwt = require('jsonwebtoken')

// Create JSON web token function
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

module.exports.signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);

        // create a JWT
        const token = createToken(user._id);

        res.status(200).json({ email, token });
        console.log("User is successfully registered!")        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}