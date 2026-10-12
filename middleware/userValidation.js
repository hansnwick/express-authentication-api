const validateUser = (req,res,next) => {


    const {name,age} = req.body;

    if (name === undefined || age === undefined){

        return res.status(400).json ({
            message: "name and age required"
        })
    }

    if (typeof name !== "string") {

        return res.status(400).json (
            {
                message:"Name must be a string"
            }
        )
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

    next();
};



module.exports = validateUser;

