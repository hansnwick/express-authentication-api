const validateBook = (req,res,next) => {


    const {title,author} = req.body;

    if (title === undefined || author === undefined){

        return res.status(400).json ({
            message: "title and author required"
        })
    }

    if (typeof title !== "string") {

        return res.status(400).json (
            {
                message:"Title must be a string"
            }
        )
    }
    

    if(typeof author !== "string"){
            return res.status(400).json({
                message:"Author must be a string"
            })
        }


    if (title.trim() === "") {
    return res.status(400).json({
        message: "Title cannot be empty"
    });
}    

    if (author.trim() === "") {
    return res.status(400).json({
        message: "Author cannot be empty"
    });
}



    next();
};



module.exports = validateBook;

