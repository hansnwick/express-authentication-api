const validateRoleUpdate = (req, res, next) => {

    const { email, role } = req.body;

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

    // Validate role

    if (role === undefined || role === null) {
        return res.status(400).json({
            message: "role required"
        });
    }

    if (typeof role !== "string") {
        return res.status(400).json({
            message: "role must be a string"
        });
    }

    if (role.trim() === "") {
        return res.status(400).json({
            message: "role must not be empty"
        });
    }

    // Allowlist valid roles

    const allowedRoles = ["user", "admin"];

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Invalid role"
        });
    }

    next();
};

module.exports = validateRoleUpdate;