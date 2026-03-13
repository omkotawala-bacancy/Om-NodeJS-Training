/*
    app.get('/user/:id', async (req, res, next) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        throw new Error("User not found");
    }
    res.json(user);
    })

    a) If getUserById() throws an error, will Express automatically send it to error middleware? Why or why not?

    Answer : No the express will not automatically send it to the error middleware because the next is not called here so it will not cut automatically.
*/

// b) Modify the code so the error correctly reaches Express error middleware.

app.get('/user/:id', async (req, res, next) => {
    try {
        app.get('/user/:id', async (req, res, next) => {
            const user = await getUserById(req.params.id);
            if (!user) {
                throw new Error("User not found");
                next();
            }
            res.json(user);
        })
    }
    catch (error) {
        next(error)
    }
})

// c) What is the correct signature of an Express error middleware?

app.use((err, req, res, next) => {

    console.group(err.message)

    res.status(500).json({
        error: 'Something went wrong'
    })
})