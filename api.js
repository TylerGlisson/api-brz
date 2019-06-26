const express = require('express');
const app = express();

app.use(express.json());

const applicants = [
    {
        firstName: 'Tyler',
        lastName: 'Glisson',
        DOB: '08.26.1984',
        id: 0
    },
    {
        firstName: 'Omar',
        lastName: 'Little',
        DOB: '01.01.1975',
        id: 1
    },
    {
        firstName: 'Jimmy',
        lastName: 'McNulty',
        DOB: '01.01.1968',
        id: 2
    },
];

app.get('/', (req, res) =>{
    res.send('hello world');
});

app.get('/api/applicants', (req, res) => {
    res.send(applicants);
});

app.get('/api/applicants/:id', (req, res) => {
    const applicant = applicants.find(app => app.id === parseInt(req.params.id));
    if (!applicant) res.status(404).send('The applicant with the given id was not found');
    res.send(applicant);
});

app.post('/api/applicants', (req, res) => {
    const applicant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        DOB: req.body.DOB,
        id: applicants.length + 1
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`)); 