const { Applicants, validateApplicant } = require('../models/applicants');
const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');
const hgetallAsync = promisify(client.hgetall).bind(client);
const hmgetAsync = promisify(client.hmget).bind(client);


router.get('/', async (req, res) => {
    const applicantList = await hgetallAsync("applicants");
    res.send(applicantList);
});

router.get('/:id', async (req, res) => {
    // Check Redis first
    const applicant = await hmgetAsync('applicants', req.params.id);

    if (!applicant[0]) {
        // Then check Mongo
        const applicantM = await Applicants.find({ username: req.params.id });
        if (!applicantM[0]){
            return res.status(404).send
            ('The applicant with the given ID was not found');
        }
        client.hset('applicants', req.params.id, applicantM[0]._id);
        res.send(applicantM[0]._id);
    }
    res.send(applicant[0]);
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

 module.exports = router;