const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be at least 3 characters long'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [3, 'Password must be at least 3 characters long'],
        match: [/^[A-Za-z0-9]+$/, 'Password must be alphanumeric'],
    },
    likedPlays: [],
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


