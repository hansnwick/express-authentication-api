
require("dotenv").config();

const config = require("./config/env");
const pool = require("./config/database");
const app = require("./app");

let server;
let isShuttingDown = false;

// Graceful shutdown
const shutdown = (signal) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    console.log(`\n${signal} received. Shutting down...`);

    if (!server) {
        pool.end()
            .then(() => {
                console.log("Database connection pool closed.");
                process.exitCode = 0;
            })
            .catch((error) => {
                console.error(
                    "Error closing database pool:",
                    error.message
                );
                process.exitCode = 1;
            });

        return;
    }

    server.close(async () => {
        console.log("HTTP server closed.");

        try {
            await pool.end();
            console.log("Database connection pool closed.");
            process.exitCode = 0;
        } catch (error) {
            console.error(
                "Error closing database pool:",
                error.message
            );
            process.exitCode = 1;
        }
    });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Start only after the database connection succeeds
const startServer = async () => {
    try {
        const result = await pool.query("SELECT NOW()");

        console.log("Database connected:");
        console.log(result.rows[0]);

        console.log(`Environment: ${config.nodeEnv}`);

        server = app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });

        server.on("error", async (error) => {
            console.error(
                "HTTP server failed to start:",
                error.message
            );

            try {
                await pool.end();
            } catch (closeError) {
                console.error(
                    "Error closing database pool:",
                    closeError.message
                );
            }

            process.exitCode = 1;
        });
    } catch (error) {
        console.error("Application startup failed:");
        console.error(error);

        try {
            await pool.end();
        } catch (closeError) {
            console.error(
                "Error closing database pool:",
                closeError.message
            );
        }

        process.exitCode = 1;
    }
};

startServer();
