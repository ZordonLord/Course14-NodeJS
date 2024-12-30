const express = require('express');
const { readData, saveData } = require('./saveData');
const app = express();

const port = 3000;

app.use(express.json());

let users = readData();
let uniqueID = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;

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
    const newUser = { id: uniqueID, ...req.body };
    users.push(newUser);
    saveData(users);
    res.send({ id: uniqueID });
});

app.put('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        user.name = req.body.name;
        user.age = req.body.age;
        saveData(users);
        res.send({ user });
    } else {
        res.status(404).send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((user) => user.id === Number(req.params.id));
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        saveData(users);
        res.send({ user: deletedUser });
    } else {
        res.status(404).send({ user: null });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});