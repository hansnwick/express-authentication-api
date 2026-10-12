import jwt from "jsonwebtoken";

const token = jwt.sign(
    {
        userId: 1,
        email: "hansaka@example.com"
    },
    "my-secret-key"
);

console.log(token);