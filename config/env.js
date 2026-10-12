
const requiredEnv = (name) => {
    const value = process.env[name];

    if (!value || value.trim() === "") {
        throw new Error(
            `Missing required environment variable: ${name}`
        );
    }

    return value;
};

const requiredPort = (name) => {
    const value = Number(requiredEnv(name));

    if (
        !Number.isInteger(value) ||
        value < 1 ||
        value > 65535
    ) {
        throw new Error(`${name} must be a valid port number`);
    }

    return value;
};

// Validate the application port
const port = process.env.PORT
    ? requiredPort("PORT")
    : 3000;

// Export validated configuration
module.exports = {
    port,
    nodeEnv: (() => {
    const value = process.env.NODE_ENV || "development";
    const allowed = ["development", "production", "test"];

    if (!allowed.includes(value)) {
        throw new Error(`Invalid NODE_ENV: ${value}`);
    }

    return value;
    })(),
    jwtSecret: requiredEnv("JWT_SECRET"),

    database: {
        host: requiredEnv("DB_HOST"),
        port: requiredPort("DB_PORT"),
        name: requiredEnv("DB_NAME"),
        user: requiredEnv("DB_USER"),
        password: requiredEnv("DB_PASSWORD")
    },

    requiredEnv
};