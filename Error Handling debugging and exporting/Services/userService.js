const fs = require('fs').promises
const path = require('path');
const pathname = path.join(__dirname, '../data/users.json');

exports.getAllUser = async () => {

    const users = await fs.readFile(pathname, 'utf8')

    return JSON.parse(users)
}

exports.addUser = async (name, email) => {

    const data = await fs.readFile(pathname, 'utf8');

    const users = JSON.parse(data)

    const newUSer = {
        id: users.length + 1,
        name, 
        email
    }

    users.push(newUSer)

    await fs.writeFile(pathname, JSON.stringify(users, null, 2))

    return newUSer
}