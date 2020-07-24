const express = require('express');
const app = express();
const mLCtrl = require('../server/controllers/messageLogController')
const path = require('path');

app.use(express.json());

function verifyUserContent(req, res, next) {
    const { user, message } = req.body;

    if(!user || !user.trim() || !message || !message.trim()) {
        console.log(">>> Somebody isn't playing nice!")
        return res.status(403).send('Who are you and what are you trying to pull?')
    }
    next();
}


// chat endpoints
app.get('/api/chat', mLCtrl.getAll);
app.post('/api/chat', verifyUserContent, mLCtrl.addOne);
app.put('/api/chat/:messageId', verifyUserContent, mLCtrl.editOne);
app.delete('/api/chat/:user', mLCtrl.deleteAll);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

const SERVER_PORT = 5050;
app.listen(SERVER_PORT, () => console.log(`Server jamming on ${SERVER_PORT}`))