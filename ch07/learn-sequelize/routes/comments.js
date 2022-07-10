const express = require('express');
const { User, Comment } = require('../models');

const router = express.Router();

router.post('/', async(req, res, next) => {
    const commenter = req.body.id;
    const comment = req.body.comment;

    try {
        const result = await Comment.create({
            commenter,
            comment
        });
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    .patch(async(req, res, next) => {
        const {id} = req.params;
        const {comment} = req.body;
        try {
            const result = await Comment.update({
                comment
            }, {
                where: { id }
            });

            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async(req, res, next) => {
        const {id} = req.params;
        try {
            const result = await Comment.destroy({where: { id }});
            req.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;