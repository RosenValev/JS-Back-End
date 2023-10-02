const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        // match: [/^[A-Za-z0-9]+$/, 'Email must be alphanumeric'],
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
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password don`t match');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;


