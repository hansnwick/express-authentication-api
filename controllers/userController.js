const { findAll, findById, create, update, updatePartial, remove } = require("../models/userModel");
const AppError = require("../utils/AppError");

const getAllUsers = (req, res) => {
    
    const users = findAll();
    res.json(users);
};


const getUserById = (req, res, next) => {
    
    const id = Number(req.params.id);
    const user = findById(id);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    res.json(user);

    
}


const createUser = (req, res) => {
 
    const {name,age} = req.body;

    if(name === undefined || age === undefined){
        return res.status(400).json({
            message:"Name and Age are required"
        });
    }

    if(typeof name !== "string"){
        return res.status(400).json({
            message:"Name must be a string"
        })
    }
    if(typeof age !== "number"){
            return res.status(400).json({
                message:"Age must be a number"
            })
        }

    if (age <= 0){

        return res.status(400).json({
        message: "Age must be greater than 0"
    });
    }

            
            const user = create(name, age);

          

            return res.status(201).json(
                {
                    message:"User created successfully",
                    user
                }
            )
            }


const updateUser = (req, res,next) => {

    const id = Number(req.params.id);

    const { name, age } = req.body;

    const updatedUser = update(id, name, age);

    if (!updatedUser) {
    return next(new AppError("User not found",404));    }


        else {

            

            res.json({
                message: "User updated successfully",
                user: updatedUser
            });
            }}

const updateUserPartially = (req, res, next) => {
    const id = Number(req.params.id);

    const updatedUser = updatePartial(id, req.body);

    if (!updatedUser) {
        return next(new AppError("User not found",404));
    }

    res.json({
        message: "User partially updated",
        user: updatedUser
    });
};

const deleteUser = (req, res, next) => {
    const id = Number(req.params.id);

    const deletedUser = remove(id);

    if (!deletedUser) {
        return next(new AppError("User not found",404));
    }

    res.json({
        message: "User deleted successfully",
        user: deletedUser
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserPartially,
    deleteUser
};