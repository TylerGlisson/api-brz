const express = require('express');
const app = express();
const applicants = {
    'firstName': 'Tyler',
    'lastName': 'Glisson',
    'DOB': '08.26.1984'
};

app.get('/', (req, res) =>{
    res.send('hello world');
});

app.get('/api/applicants', (req, res) => {
    res.send(applicants);
});

app.listen(3000, () => console.log('listening on 3000')); 