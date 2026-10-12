const validateRegister = (req, res, next) => {

    const { email, password } = req.body;

    // Validate email

    if (email === undefined || email === null) {
        return res.status(400).json({
            message: "email required"
        });
    }

    if (typeof email !== "string") {
        return res.status(400).json({
            message: "email must be a string"
        });
    }

    if (email.trim() === "") {
        return res.status(400).json({
            message: "email must not be empty"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }


    // Validate password

    if (password === undefined || password === null) {
        return res.status(400).json({
            message: "password required"
        });
    }

    if (typeof password !== "string") {
        return res.status(400).json({
            message: "password must be a string"
        });
    }

    if (password.trim() === "") {
        return res.status(400).json({
            message: "password must not be empty"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "password must be at least 8 characters"
        });
    }

    next();
};

module.exports = {
    validateRegister
};