const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const applicants = require('./routes/applicants');
const jobs = require('./routes/jobs');
const home = require('./routes/home');
const users = require('./routes/users');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/users', users);
app.use('/api/applicants', applicants);
app.use('/api/jobs', jobs);
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



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`)); 