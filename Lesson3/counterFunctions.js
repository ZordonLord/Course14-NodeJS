const fs = require('fs');
const path = require('path');

const counterFilePath = path.join(__dirname, 'counters.json');

function loadCounters() {
    try {
        if (fs.existsSync(counterFilePath)) {
            const data = fs.readFileSync(counterFilePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
    }
    return {};
}

function saveCounters(counters) {
    try {
        fs.writeFileSync(counterFilePath, JSON.stringify(counters, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка при записи файла:', error);
    }
}

function incrementCounter(page) {
    const counters = loadCounters();
    console.log('До обновления:', counters);
    counters[page] = (counters[page] || 0) + 1;
    console.log('После обновления:', counters);
    saveCounters(counters);
}

module.exports = { loadCounters, saveCounters, incrementCounter };
