const userService = require('../Services/userService')

exports.getUser = async(req, res, next) => {

    try {
        
        const users = await userService.getAllUser()
        res.json(users)
    } 
    catch (error) {
        next(error)
    }
}

exports.createUser = async(req, res, next) => {

    try {
        
        const {name, email} = req.body;

        if(!name || !email){
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const user = await userService.addUser(name, email)

        res.status(201).json({
            data: user
        })
    } 
    catch (error) {
        next(error)
    }
}