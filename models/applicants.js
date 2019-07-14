const mongoose = require('mongoose');
const Joi = require('joi');

const Applicants = mongoose.model('Applicants', new mongoose.Schema({
    firstName: String,
    lastName: String, 
    dob: Date,
    resumeOnFile: Boolean,
    date: { type: Date, default: Date.now },
    username: String
    }
));


function validateApplicant(appli) {
    const schema = {
                firstName: Joi.string().min(2).max(30).required(),
                lastName: Joi.string().min(2).max(30).required(),
                dob: Joi.date().iso().required()
    };
    return Joi.validate(appli, schema);
 };

exports.Applicants = Applicants;
exports.validateApplicant = validateApplicant;