const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin');
const { Job, validateJob } = require('../models/jobs')
const express = require('express');
const router = express.Router();

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

router.post('/', auth, async (req, res) => {
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

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', [auth, admin], async (req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).send('The job with the given id was not found');
    
    res.send(job);
});

 module.exports = router;