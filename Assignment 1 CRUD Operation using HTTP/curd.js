const http = require('http')
const fs = require('fs').promises
const url = require('url')
const path = require('path')

const FILE_PATH = path.join(__dirname, "users.json");

async function getData(req) {
    return new Promise((resolve, reject) => {

        let body = ''

        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
            resolve(JSON.parse(body))
        })
        req.on('error', (err) => {
            reject(err)
        })
    })
}

function sendJSON(code, res, data) {

    res.writeHead(code, {
        'content-type': 'application/json'
    })
    res.end(data ? JSON.stringify(data) : '')
}

async function putData() {

}
const server = http.createServer(async (req, res) => {

    const { method, url } = req
    const idRegex = /^\/users\/\d+$/;

    if (url.startsWith('/users') && method === 'GET') {
        try {

            const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf8'))
            if (idRegex.test(url)) {
                const id = parseInt(url.split('/')[2])
                const user = data.find(user => user.id === id)

                user ? sendJSON(200, res, user ? user : { message: `user with the ${id} does not exist` }) :
                    sendJSON(404, res, { message: 'User not found' })
            }
            else {
                sendJSON(200, res, data)
            }
        }
        catch (error) {
            console.log(error)
            sendJSON(500, res, { error: 'Internal Server Error' })
        }
    }

    else if (method === 'POST' && url.startsWith('/users')) {

        try {

            const body = await getData(req)
            const users = JSON.parse(await fs.readFile(FILE_PATH, 'utf8',))
            const existingUser = users.filter(user => user.email === body.email)

            if (existingUser.length > 0) {
                sendJSON(400, res, { message: 'User already exis' })
            }
            else {
                users.push({ id: (users.at(-1).id ?? 0) + 1, ...body })
                await fs.writeFile(FILE_PATH, JSON.stringify(users), 'utf8')
                sendJSON(200, res, { userId: users.at(-1).id })
            }
        }
        catch (error) {
            console.log(error)
            sendJSON(500, res, { error: 'Internal Server error' })
        }
    }

    else if (method === 'PUT' && url.startsWith('/users')) {

        try {

            if (idRegex.test(url)) {

                const body = await getData(req)
                const id = parseInt(url.split('/')[2])
                const users = JSON.parse(await fs.readFile(FILE_PATH, 'utf8',))
                const index = users.findIndex(user => {
                    return user.id === id
                })
                if (index !== -1) {
                    users[index] = { id, ...body}
                    await fs.writeFile(FILE_PATH, JSON.stringify(users), 'utf8')
                    sendJSON(200, res, { updatedUser: users[index] })
                }
                else {
                    sendJSON(400, res, { message: "Used id is not provided in the request" })
                }
            }
        }
        catch (error) {
            console.log(error)
            sendJSON(500, res, { error: 'Internal Server Error' })
        }
    }

    else if (method === 'PATCH' && url.startsWith('/users')) {

        try {

            if (idRegex.test(url)) {

                const body = await getData(req)
                const id = parseInt(url.split('/')[2])
                const users = JSON.parse(await fs.readFile(FILE_PATH, 'utf8',))
                const index = users.findIndex(user => {
                    return user.id === id
                })
                if (index !== -1) {
                    users[index] = { ...users[index], ...body }
                    await fs.writeFile(FILE_PATH, JSON.stringify(users), 'utf8')
                    sendJSON(200, res, { updatedUser: users[index] })
                }
                else {
                    sendJSON(400, res, { message: "Used id is not provided in the request" })
                }
            }
        }
        catch (error) {
            console.log(error)
            sendJSON(500, res, { error: 'Internal Server Error' })
        }
    }

    else if (method === 'DELETE' && url.startsWith('/users')) {

        try {

            if (idRegex.test(url)) {
                const id = parseInt(url.split('/')[2])
                const users = JSON.parse(await fs.readFile(FILE_PATH, 'utf8',))
                const filteredUSer = users.filter(user => user.id !== id)
                const user = users.find(user => user.id === id)

                if (users.length !== filteredUSer.length) {

                    await fs.writeFile(FILE_PATH, JSON.stringify(filteredUSer), 'utf8')
                    sendJSON(200, res, {
                        deletedUser: user
                    })
                }
                else {
                    sendJSON(404, res, {
                        message: "User with given id does not exists"
                    })
                }
            }
            else {
                sendJSON(400, res, { message: "Used id is not provided in the request" })
            }
        }
        catch (error) {
            console.log(error)
            sendJSON(500, res, { error: 'Internal Server Error' })
        }
    }
})

server.listen(3000, () => {
    console.log('Server is listening at 3000')
})