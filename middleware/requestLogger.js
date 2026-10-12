
const requestLogger = (req, res, next) => {
    // Skip console logging during automated tests.
    if (process.env.NODE_ENV === "test") {
        return next();
    }

    const startTime = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - startTime;

        console.log(
            `[${new Date().toISOString()}]`,
            req.method,
            req.path,
            res.statusCode,
            `${duration}ms`
        );
    });

    next();
};

module.exports = requestLogger;
