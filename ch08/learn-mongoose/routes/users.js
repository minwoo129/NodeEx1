const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
    .get(async(req, res, next) => {
        try {
            const result = await User.find({});
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async(req, res, next) => {
        const {name, age, married} = req.body;

        try {
            const result = await User.create({
                name,
                age,
                married
            });
            console.log(result);
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get('/:id/comments', async(req, res, next) => {
    const {id} = req.params;

    try {
        const result = await Comment.find({commenter: id}).populate('commenter');
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;