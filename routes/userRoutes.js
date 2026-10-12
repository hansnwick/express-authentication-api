const { getAllUsers, getUserById, createUser, updateUser, updateUserPartially, deleteUser } = require("../controllers/userController");
const validateUser = require("../middleware/userValidation");
const AppError = require("../utils/AppError");



const express = require("express");

const router = express.Router();

let users = [
    {
        id: 1,
        name: "Hansaka",
        age: 25
    },
    {
        id: 2,
        name: "Kamal",
        age: 30
    }
];


router.get("/test-error", (req, res, next) => {

    const error = new AppError("User not found", 404);

    next(error);

});

router.get("/", getAllUsers);


router.get("/:id", getUserById);




router.post("/", validateUser,createUser);


//PUT

router.put("/:id", updateUser)


//PATCH
router.patch("/:id",updateUserPartially)


//DELETE
router.delete("/:id",deleteUser)



module.exports = router;