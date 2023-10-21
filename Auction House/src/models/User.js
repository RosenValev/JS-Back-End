const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        minLength: [1, 'firstName must be at least 1 characters long'],
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        minLength: [1, 'lastName must be at least 1 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Only English letters are allowed'],
        validate: {
            validator: async function (value) {
                // Custom validation logic to check uniqueness
                const email = await this.constructor.findOne({ email: value });
                return !email;
            },
            message: 'Email already exists',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be at least 5 characters long'],
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password don`t match');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 9);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;


