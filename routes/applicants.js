const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const Applicants = mongoose.model('Applicants', new mongoose.Schema({
    firstName: String,
    lastName: String, 
    dob: Date,
    resumeOnFile: Boolean,
    date: { type: Date, default: Date.now }
    }
));

router.get('/', async (req, res) => {
    const applicantsList = await Applicants.find().sort('name');
    res.send(applicantsList);
});

router.get('/:id', async (req, res) => {
    const applicant = await Applicants.findById(req.params.id);

    if (!applicant) return res.status(404).send
        ('The applicant with the given ID was not found');
    res.send(applicant);
});

router.post('/', async (req, res) => {
    const { error } = validateApplicant(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let applicant = new Applicants({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        dob: req.body.dob,
        resumeOnFile: req.body.resumeOnFile
    });
    applicant = await applicant.save();
    res.send(applicant);
});

router.put('/:id', async (req, res) => {
    const { error } = validateApplicant(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const applicant = await Applicants.findByIdAndUpdate(
        req.params.id, { 
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            dob: req.body.dob,
            resumeOnFile: req.body.resumeOnFile
        }, { new: true });

    if (!applicant) return res.status(404).send('The applicant with the given id was not found');

    res.send(applicant);
});

router.delete('/:id', async (req, res) => {
    const applicant = await Applicants.findByIdAndDelete(req.params.id);
    if (!applicant) return res.status(404).send('The applicant with the given id was not found');
    
    res.send(applicant);
});

function validateApplicant(appli) {
    const schema = {
                firstName: Joi.string().min(2).max(30).required(),
                lastName: Joi.string().min(2).max(30).required(),
                dob: Joi.date().iso().required()
    };
    return Joi.validate(appli, schema);
 };

 module.exports = router;