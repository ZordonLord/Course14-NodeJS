const uuid = require('uuid');
const hello = require('./hello.js')

const id = uuid.v4();

console.log(id);

hello.sayHello();

console.log(hello.add(3, 2));
console.log(hello.substract(3, 2));

// npm run start - запуск
// npm install - установка зависимостей и обновление
// npm ci - установка зависимостей, без обновления
// npm uninstall <имя пакета> - удаление пакета