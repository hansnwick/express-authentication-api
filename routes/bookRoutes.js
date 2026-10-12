const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require("../controllers/bookController");
const validateBook = require("../middleware/bookValidation");


const express = require("express");

const router = express.Router();



router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", validateBook,createBook);


//PUT
router.put("/:id", updateBook)

//DELETE
router.delete("/:id",deleteBook)



module.exports = router;
