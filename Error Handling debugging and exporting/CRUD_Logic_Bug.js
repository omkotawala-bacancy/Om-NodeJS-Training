/*
    router.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json'));
    res.json(users);
    });

    a) Why is readFileSync considered a bad practice in production servers?

    Answer : Because here the file is being read synchronously and it will pause the further stps until the file is being read sucessfully which will pause the server and also if the error occurs while reading the file then whole execution of the function will be crashed.
*/

// b) Rewrite the route using async/await with fs.promises.

router.get('/users', async (req, res, next) => {

    try {
        const users = await JSON.parse(fs.readFile('./data/users.json'));

        res.json(users)
    }
    catch (error){
        console.log(error.message)
        next(error)
    }
})

/*
    c) What will happen to the Node.js event loop if many requests call this route simultaneously?

    Answer : If multiple process started calling this request then due to synchronous reading of the file the server will stop other function and ultimately it will crash.
*/