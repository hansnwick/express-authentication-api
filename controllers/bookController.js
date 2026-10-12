const { findAll, findById, create, update, remove } = require("../models/bookModel");
const AppError = require("../utils/AppError");


const getAllBooks = (req, res) => {
    
    const books = findAll();
    res.json(books);
};


const getBookById = (req, res, next) => {
    
    const id = Number(req.params.id);
    const book = findById(id);

    if (!book) {
        return next(new AppError("Book not found", 404));
    }

    res.json(book);

    
}


const createBook = (req, res) => {
 
    const {title,author} = req.body;
            
            const book = create(title, author);

          
            return res.status(201).json(
                {
                    message:"Book created successfully",
                    book
                }
            )
            }

const updateBook = (req, res,next) => {

    const id = Number(req.params.id);

    const { title, author } = req.body;

    const updatedBook = update(id, title, author);

    if (!updatedBook) {
    return next(new AppError("Book not found",404));    }


        else {

            

            res.json({
                message: "Book updated successfully",
                book: updatedBook
            });
            }}


const deleteBook = (req, res, next) => {
    const id = Number(req.params.id);

    const deletedBook = remove(id);

    if (!deletedBook) {
        return next(new AppError("Book not found",404));
    }

    res.json({
        message: "Book deleted successfully",
        book: deletedBook
    });
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};