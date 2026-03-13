const express = require('express');
const app = express();
const errorMiddleware  = require('./Middleware/errorMiddleware')
const router = require('./Router/router')

app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log("Server running on port 3000");
});