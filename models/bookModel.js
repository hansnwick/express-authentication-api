let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 2, title: "1984", author: "George Orwell" }
];


const findAll = () => {
    return books;
};


const findById = (id) => {
    return books.find(book => book.id === id);
};


const create = (title, author) => {
    const id = books.length + 1;

    const book = {
        id,
        title,
        author
    };

    books.push(book);

    return book;
};


const update = (id, title, author) => {
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return null;
    }

    const updatedBook = {
        id,
        title,
        author
    };

    books[index] = updatedBook;

    return updatedBook;
};


const remove = (id) => {
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return null;
    }

    const deletedBook = books[index];

    books.splice(index, 1);

    return deletedBook;
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};