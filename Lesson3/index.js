const express = require('express');
const path = require('path');
const counterFunctions = require('./counterFunctions');

const app = express();
const port = 3000;

const staticDir = path.join(__dirname, 'static');
app.use(express.static(staticDir));

// app.use((req, res, next) => {
//     console.log('Поступил запрос', req.method, req.url);
//     next();
// })

// app.get('/', (req, res) => {
//     const page = req.params.page;
//     incrementCounter = counterFunctions.incrementCounter(page);
//     res.sendFile(staticDir);
// });

app.get('/', (req, res) => {
    const page = req.params.page;
    console.log(page);
    const filePath = path.join(staticDir, `${page}.html`);
    if (path.extname(filePath) !== '.html' || !filePath.startsWith(staticDir)) {
        return res.status(404).send('Страница не найдена');
    }
    counterFunctions.incrementCounter(page);
    return res.status(200).sendFile(filePath);
});

app.get('/api/views/:page', (req, res) => {
    const page = req.params.page;
    const counters = counterFunctions.loadCounters();
    const views = counters[page] || 0;
    res.json({ page, views });
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static/index.html'));
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>Страница About</h1>');
// });

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

