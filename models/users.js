const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

module.exports = (mongoose) => {
    const userSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    })
    
    // static login method
    userSchema.statics.login = async function (email, password) {
        if (!email || !password) {
            throw Error("All fields must be filled!");
        }

        const user = await this.findOne({ email })

        if (!user) {
            throw Error('Incorrect email!');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error("Incorrect password!");
        }

        return user
    }


    // static signup method
    userSchema.statics.signup = async function (email, password) {
        
        // validation
        if (!email || !password) {
            throw Error("All fields must be filled!");
        }
        if (!validator.isEmail(email)) {
            throw Error("Email is not valid!");
        }

        /* minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 */
        if (!validator.isStrongPassword(password)) {
            throw Error("Password is not strong enough!");
        }

        const exists = await this.findOne({ email })

        if (exists) {
            throw Error('Email already in use!')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ email, password: hash })

        return user
    }

    return mongoose.model('users', userSchema);
}