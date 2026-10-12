
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const requestLogger = require("./middleware/requestLogger");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorHandler");
const authUserModel = require("./models/authUserModel");

const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const validateRoleUpdate = require("./middleware/validateRoleUpdate");

const app = express();

// Security middleware
app.use(helmet());

app.use(cors({
    origin: "http://localhost:5173"
}));

// General middleware
app.use(express.json());
app.use(requestLogger);

// Health-check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is healthy"
    });
});

// Protected profile route
app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your profile",
        userId: req.user.userId,
        email: req.user.email
    });
});

// Admin-only route
app.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
    res.json({
        message: "Welcome to the admin area",
        user: req.user.email
    });
});

// Update a user's role (admin only)
app.put(
    "/users/role",
    authMiddleware,
    adminMiddleware,
    validateRoleUpdate,
    async (req, res, next) => {
        try {
            const { email, role } = req.body;

            const user = await authUserModel.updateRole(email, role);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            return res.json({
                message: "User role updated",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            return next(error);
        }
    }
);

// Application routes
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
