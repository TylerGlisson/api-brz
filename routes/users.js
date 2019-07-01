const _ = require('lodash');
const {User, validateUser} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registerred.');

    user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    await user.save()

    const results = _.pick(user, ['_id', 'name', 'email'])

    res.send(results);
});

 module.exports = router;