const express = require('express')
const app = express()

app.use(express.json())

let authors = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
let books = [
    { id: 1, title: 'Clean Code', authorId: 1 },
    { id: 2, title: 'Refactoring', authorId: 1 },
    { id: 3, title: 'SICP', authorId: 2 },
];

app.get('/api/authors' , (req ,res) => {

    res.json(authors)
})

app.get('/api/authors/:id', (req, res) => {

    const result = authors.filter(a => a.id == req.params.id)
    if(result.length > 0){
        res.json(result)
    }
    else{
        res.status(404).json({status: 404, error: `Author with AuthorId : ${req.params.id} is not found`})
    }
})

app.route('/api/authors/:id/books')
    .get((req, res) => {

        const AuthorId = Number(req.params.id)

        const AuthorBooks = books.filter(b => b.authorId === AuthorId)
        if(AuthorBooks.length > 0){
            res.json(AuthorBooks)
        }
        else{
            res.status(404).json({status: 404, error: `Author with AuthorId : ${req.params.id} is not found`})
        }
    })
    .post((req,res) => {

        const AuthorId = Number(req.params.id)
        const {title} = req.body

        if((authors.filter(a => a.id === AuthorId)).length <= 0){
            res.status(404).json({status: 404, error: `Author with AuthorId : ${req.params.id} is not found`})
        }

        if(title.trim() === ''){
            res.status(400).json({status: 404, error: `title cannot be empty`})
        }
        else{

            const book = {id: books.length + 1, ...req.body, authorId: AuthorId}
            books.push(book)
            res.json({book})
        }
    })

app.get('/api/books', (req, res) => {
        res.json(books)
})

app.listen(3000, () => {
    console.log('server is listening at th port 3000')
})