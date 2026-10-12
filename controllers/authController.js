const config = require("../config/env");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUserModel = require("../models/authUserModel");


const register = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        // 1. Check whether the email already exists
        const emailExist = await authUserModel.findByEmail(email);

        if (emailExist) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // 2. Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // 3. Create the user
        const newUser = await authUserModel.create(email, passwordHash);

        // 4. Send the response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
         

       

        return next(error);
    }
};



const login = async (req, res, next) => {
    try{
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await authUserModel.findByEmail(email);


    // 2. If user doesn't exist
    if (!user) {

        return res.status(401).json (

            {
                message: "Invalid email or Password"
            }

        )
    }

    // 3. Compare the password with the stored hash

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)


    // 4. If password is incorrect

    if(!passwordCorrect) {

        return res.status(401).json (
            {
                message: "Invalid email or password"
            }

        )
    }

    const token = jwt.sign(
    {
        userId: user.id,
        email: user.email,
        role: user.role
    },
    config.jwtSecret,
    {
        expiresIn: "1h"
    }
);


    // 5. Send successful login response

        return res.status(200).json (

            {
                "message": "Login successful",
                "token": token,
                "user": {
                    "id": user.id,
                    "email": user.email
                }
}
        )} catch (error) {
        return next(error);
    }
    



};


module.exports = {
    register,
    login
};