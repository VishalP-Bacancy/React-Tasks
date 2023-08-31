const User = require('../../models/userModel')

exports.getUsersList = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users)
}

exports.getUserById = async (req, res, next) => {
    const { id }  = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
}


exports.addUser = async (req, res, next) => {

    console.log(req.body)
    const { userName, userAge } = req.body
    
    const user = new User({
        username: userName,
        age: userAge
    })

    await user.save()

    res.status(201).json({
        message: `User added successfully`
    })
    
}


exports.editUser = async (req, res, next) => {

    const { userName, userAge } = req.body
    const { id } = req.params

    const user = await User.findById(id)

    user.username = userName;
    user.age = userAge

    await user.save()

    res.status(200).json({
        message: `User updated successfully`
    })
}


exports.deleteUser = async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findById(id)

    if(!user){
        const error = new Error('User not found!')
        error.statusCode = 404
        throw error;
    }

    await User.findByIdAndDelete(id)

    res.status(200).json({
        message: `User deleted successfully!`
    })
}