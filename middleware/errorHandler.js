
const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    // PostgreSQL: unique constraint violation
    if (err.code === "23505") {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    // PostgreSQL: NOT NULL constraint violation
    if (err.code === "23502") {
        return res.status(400).json({
            message: "A required field is missing"
        });
    }

    const status =
        Number.isInteger(err.status) &&
        err.status >= 400 &&
        err.status <= 599
            ? err.status
            : 500;
            
    const message =
        status >= 500 && process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message || "Internal Server Error";

    return res.status(status).json({
        message
    });
};

module.exports = errorHandler;