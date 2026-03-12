const express = require('express')
const app = express();

app.use(express.json())

let products = [
    { id: 1, name: 'Laptop', category: 'tech', price: 999 },
    { id: 2, name: 'Phone', category: 'tech', price: 499 },
    { id: 3, name: 'Desk', category: 'furniture', price: 299 },
    { id: 4, name: 'Chair', category: 'furniture', price: 199 },
];

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

app.get('/api/products', (req, res) => {

    const { category, sort, page, limit } = req.query;
    let result = [...products]

    const start = Number((page - 1) * limit)
    const end = start + Number(limit);

    if (category) {

        result = result.filter(cat => cat.category.toLowerCase() === category.toLowerCase())
    }

    if (sort) {

        const field = sort.startsWith('-') ? sort.slice(1) : sort;

        if (field === 'category' || field === 'name') {

            if (sort.startsWith('-')) {
                result.sort((a, b) => b[field].localeCompare(a[field]));
            } else {
                result.sort((a, b) => a[field].localeCompare(b[field]));
            }

        } else {

            if (sort.startsWith('-')) {
                result.sort((a, b) => b[field] - a[field]);
            } else {
                result.sort((a, b) => a[field] - b[field]);
            }

        }
    }

    if(page){

        result = result.slice(start, end)
    }

    res.json({ data: result, total: result.length, page: +page, limit: +limit })
})

app.listen(3000, () => {
    console.log('server is listening at Port 3000')
})