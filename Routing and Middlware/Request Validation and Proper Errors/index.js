const express = require('express')
const app = express()

app.use(express.json())

let users = []

//Middleware
const requestLogger = (req, res, next) => {

    const start = Date.now()
    const ts = new Date().toISOString()

    res.on('finish', () => {
        const ms = Date.now() - start
        console.log(`[${ts}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`)
    })

    next();
}

app.use(requestLogger);

function validateUser(body) {

    const errors = [];

    if (!body.name) {
        errors.push(
            {
                message: 'name is required',
                code: 400
            }
        )
        return errors
    }
    if (body.name.trim() === '') {
        errors.push(
            {
                message: 'name cannot be blank',
                code: 422
            }
        )
        return errors
    }
    if (!body.email) {
        errors.push(
            {
                message: 'email is required',
                code: 400
            }
        )
        return errors
    }
    if (!body.email.includes('@')) {
        errors.push({
            message: 'email is invalid',
            code: 422
        }
        )
        return errors
    }

    errors.push({message: false})
    return errors
}

app.post('/api/users', (req, res) => {

    const [error] = validateUser(req.body)
    
    if (error.message) {

        res.status(error.code).json({ error })
    }

    const user = { id: new Date().getMilliseconds(), ...req.body }
    users.push(user)
    res.status(201).json({ data: user })
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.listen(3000, () => {
    console.log('Server is listening at 3000')
})