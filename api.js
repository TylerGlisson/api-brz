const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const applicants = require('./routes/applicants');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/applicants', applicants);
app.use('/', home);
app.use(logger);


// Configuration
console.log('Application: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}

// Db work...
mongoose.connect('mongodb://localhost/playground',
    { useNewUrlParser: true, useFindAndModify: false })
        .then(() => console.log('Connected to DB'))
        .catch(err => console.error('Could not connect', err));

const applicantSchema = mongoose.Schema({
    firstName: String,
    lastName: String, 
    dob: Date,
    resumeOnFile: Boolean,
    date: { type: Date, default: Date.now }
});

const Applicant = mongoose.model('Applicant', applicantSchema);

async function getApplicants() {
    const applicants = await Applicant;
    console.log(applicants);
}

async function createApplicant() {
    const applicant = new Applicant({
        firstName: 'Tyler',
        lastName: 'Glisson',
        dob: 1984-08-26,
        resumeOnFile: true,
        date: new Date()
    });
    try {
        const result = await applicant.save();
        console.log(result);
    }
    catch (err) {
        console.log(err.message);
    }
}

async function updateApplicant(id) {
    const applicant = await Applicant.findByIdAndUpdate(id, {
        $set: {
            firstName: 'NewFirstName',
            lastName: 'NewLastName'
        }
    });
}

updateApplicant('5d18e62a07b57fa6fe830373');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`)); 