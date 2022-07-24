const express = require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const rooms = await Room.find({});
        res.render('main', { rooms, title: 'GIF 채팅방' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/room', (req, res) => {
    res.render('room', { title: 'GIF 채팅방 생성' });
});

router.post('/room', async(req, res, next) => {
    const { title, max, password } = req.body;
    const { color } = req.session;
    try {
        const newRoom = await Room.create({
            title,
            max,
            owner: color,
            password
        });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);
        res.redirect(`/room/${newRoom._id}?password=${password}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/room/:id', async(req, res, next) => {
    const { id } = req.params;
    const { password } = req.query;
    try {
        const room = await Room.findOne({ _id: id });
        const io = req.app.get('io');

        if(!room) return res.redirect('/?error=존재하지 않는 방입니다.');
        if(room.password && (room.password != password)) return res.redirect('/?error=비밀번호가 틀렸습니다.');

        const { rooms } = io.of('/chat').adapter;
        if(rooms && rooms[id] && (room.max <= rooms[id].length)) return res.redirect('/?error=허용인원을 초과했습니다.');

        res.render('chat', { room, title: room.title, chats: [], user: req.session.color })
    } catch (error) {
        console.error(err);
        return next(err);
    }
});

router.delete('/room/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        await Room.remove({ _id: id });
        await Chat.remove({ room: id });
        res.send('ok');
        setTimeout(() => {
            req.app.get('io').of('/room').emit('removeRoom', id);
        }, 2000);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;