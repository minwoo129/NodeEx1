const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user && req.user.id || null },
            include: { model: Domain }
        });
        res.render('login', {
            user,
            domains: user && user.Domains
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/domain', isLoggedIn, async(req, res, next) => {
    try {
        const {id} = req.user;
        const {host, type} = req.body;
        await Domain.create({
            UserId: id,
            host,
            type,
            clientSecret: uuidv4()
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;