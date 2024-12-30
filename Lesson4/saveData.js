const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function readData() {
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        try {
            return JSON.parse(fileContent);
        } catch (err) {
            console.error('Ошибка чтения файла:', err);
            return [];
        }
    }
    return [];
}

function saveData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
}

module.exports = { readData, saveData };