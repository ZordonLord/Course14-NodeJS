const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

let uniqueID = 0;
const users = [];

app.get('/users', (req, res) => {
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null })
    }
});

app.post('/users', (req, res) => {
    uniqueID += 1;
    users.push({id: uniqueID, ...req.body})
    res.send({ id: uniqueID });
});

app.put('/', (req, res) => {
    console.log(req.body)
    res.send('This is a put request!');
});

app.delete('/', (req, res) => {
    console.log(req.body)
    res.send('This is a delete request!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});