const express = require('express')
const app = express()
const homeRouter = require('./Routes/home')
const apiRouter = require('./Routes/api')

app.use(express.json())

app.use('/', homeRouter)
app.use('/home', homeRouter);
app.use('/api', apiRouter);

app.listen(5000, () => {
    console.log('Server is listening at port 5000')
})