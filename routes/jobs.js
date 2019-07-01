const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

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

router.get('/', async (req, res) => {
    const jobsList = await Job.find().sort('positionTitle');
    res.send(jobsList);
});

router.get('/:id', async (req, res) => {
    const job = await Jobs.findById(req.params.id);

    if (!job) return res.status(404).send
        ('The position with the given ID was not found');
    res.send(job);
});

router.post('/', async (req, res) => {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let job = new Job({
        positionTitle: req.body.positionTitle,
        positionDept: req.body.pistionDept,
        locationCountry: req.body.locationCountry,
        locationState: req.body.locationState,
        locationCity: req.body.locationCity,
        remote: req.body.remote,
        type: req.body.type,
        category: req.body.category,
        tags: req.body.tags
    });
    job = await job.save();
    res.send(job);
});

router.put('/:id', async (req, res) => {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const job = await Job.findByIdAndUpdate(
        req.params.id, { 
            positionTitle: req.body.positionTitle,
            positionDept: req.body.pistionDept,
            locationCountry: req.body.locationCountry,
            locationState: req.body.locationState,
            locationCity: req.body.locationCity,
            remote: req.body.remote,
            type: req.body.type,
            category: req.body.category,
            tags: req.body.tags
        }, { new: true });

    if (!job) return res.status(404).send('The job with the given id was not found');

    res.send(job);
});

router.delete('/:id', async (req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).send('The job with the given id was not found');
    
    res.send(job);
});

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

 module.exports = router;