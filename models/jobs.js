const Joi = require('joi');
const mongoose = require('mongoose');

const Job = mongoose.model('Job', new mongoose.Schema({
    positionTitle: String,
    positionDept: String,
    locationCountry: String,
    locationState: String,
    locationCity: String,
    remote: Boolean,
    type: String,
    category: String,
    tags: [ String ]
}));

function validateJob(joby) {
    const schema = {
        positionTitle: Joi.string().min(2).max(30).required(),
        positionDept: Joi.string().min(2).max(30).required(),
        locationCountry: Joi.string().min(2).max(30).required(),
        locationState: Joi.string().min(2).max(30).required(),
        locationCity: Joi.string().min(2).max(30).required(),
        remote: Joi.boolean().required(),
        type: Joi.string().min(2).max(30).required(),
        category: Joi.string().min(2).max(30).required(),
        tags: Joi.array()
    };
    return Joi.validate(joby, schema);
 };

 exports.Job = Job;
 exports.validateJob = validateJob;