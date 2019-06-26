const express = require('express');
const app = express();
const applicants = [
    {
        'firstName': 'Tyler',
        'lastName': 'Glisson',
        'DOB': '08.26.1984'
    },
    {
        'firstName': 'Omar',
        'lastName': 'Little',
        'DOB': '01.01.1975'
    },
    {
        'firstName': 'Jimmy',
        'lastName': 'McNulty',
        'DOB': '01.01.1968'
    },
];

app.get('/', (req, res) =>{
    res.send('hello world');
});

app.get('/api/applicants', (req, res) => {
    res.send(applicants);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`)); 