const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async(req, res, next) => {
    const {id, comment} = req.body;
    try {
        const comments = await Comment.create({
            commenter: id,
            comment
        });
        console.log(comments);
        const result = await Comment.populate(comments, { path: 'commenter' });
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
                _id: id
            }, {
                comment
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
            const result = await Comment.remove({ _id: id });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;