const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
}));

function validateUser(user) {
    const schema = {
        userName: Joi.string().min(4).max(40).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(2).max(255).required(),
    };
    return Joi.validate(user, schema);
 };

 exports.User = User;
 exports.validateUser = validateUser;