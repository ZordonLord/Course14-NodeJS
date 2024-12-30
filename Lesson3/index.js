const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    console.log('Поступил запрос', req.method, req.url);
    next();
})

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile('static/index.html');
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static/index.html'));
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>Страница About</h1>');
// });

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

