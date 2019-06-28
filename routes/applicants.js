const express = require('express');
const router = express.Router();

const applicants = [
    {
        firstName: 'Tyler',
        lastName: 'Glisson',
        dob: '08.26.1984',
        id: 0
    },
    {
        firstName: 'Omar',
        lastName: 'Little',
        dob: '01.01.1975',
        id: 1
    },
    {
        firstName: 'Jimmy',
        lastName: 'McNulty',
        dob: '01.01.1968',
        id: 2
    },
];

router.get('/', (req, res) => {
    res.send(applicants);
});

router.get('/:id', (req, res) => {
    const applicant = applicants.find(app => app.id === parseInt(req.params.id));
    if (!applicant) return res.status(404).send('The applicant with the given id was not found');
    res.send(applicant);
});

router.post('/', (req, res) => {
    const { error } = validateApplicant(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const applicant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        dob: req.body.dOB,
        id: applicants.length + 1
    };
    applicants.push(applicant);
    res.send(applicant);
});

router.put('/:id', (req, res) => {
    const applicant = applicants.find(app => app.id === parseInt(req.params.id));
    if (!applicant) return res.status(404).send('The applicant with the given id was not found');
    
    const { error } = validateApplicant(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    applicant.firstName = req.body.firstName;
    applicant.lastName = req.body.lastName;
    applicant.dob = req.body.dob;
    res.send(applicant);
});

router.delete('/:id', (req, res) => {
    const applicant = applicants.find(app => app.id === parseInt(req.params.id));
    if (!applicant) return res.status(404).send('The applicant with the given id was not found');
    
    // detlete
    const index = applicants.indexOf(applicant);
    applicants.splice(index, 1);

    // return the applicant
    res.send(applicant);
});

function validateApplicant(appli) {
    const schema = {
                firstName: Joi.string().min(2).max(30).required(),
                lastName: Joi.string().min(2).max(30).required(),
                dob: Joi.number().integer().min(1900).max(2019).required()
    };
    return Joi.validate(appli, schema);
 };

 module.exports = router;