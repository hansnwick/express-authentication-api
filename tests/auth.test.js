
const request = require("supertest");
const app = require("../app");
const pool = require("../config/database");

describe("POST /auth/register", () => {
    test("should reject an invalid email", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                email: "not-an-email",
                password: "SecurePass123"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email");
    });

    test("should reject a missing password", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                email: "missingpassword@example.com"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("password required");
    });

    
test("should reject a duplicate email", async () => {
    const response = await request(app)
        .post("/auth/register")
        .send({
            email: "centraltest@example.com",
            password: "SecurePass123"
        });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email already exists");
});

});



describe("POST /auth/login", () => {
    test("should reject a missing email", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                password: "SecurePass123"
            });

        expect(response.statusCode).toBe(400);
    });

    test("should reject a missing password", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "centraltest@example.com"
            });

        expect(response.statusCode).toBe(400);
    });

    
    test("should reject incorrect credentials", async () => {
    const response = await request(app)
        .post("/auth/login")
        .send({
            email: "centraltest@example.com",
            password: "DefinitelyWrongPassword123"
        });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
    });

    
test("should log in successfully and return a JWT token", async () => {
    const response = await request(app)
        .post("/auth/login")
        .send({
            email: "centraltest@example.com",
            password: "SecurePass123"
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.token.length).toBeGreaterThan(0);
});

});


describe("GET /profile", () => {
    test("should reject a request without a token", async () => {
        const response = await request(app).get("/profile");

        expect(response.statusCode).toBe(401);
    });

    
test("should allow access with a valid JWT", async () => {
    // Log in to obtain a real JWT.
    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: "centraltest@example.com",
            password: "SecurePass123"
        });

    expect(loginResponse.statusCode).toBe(200);

    const token = loginResponse.body.token;

    // Use the JWT to access the protected profile.
    const profileResponse = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.message).toBe(
        "Welcome to your profile"
    );
    expect(profileResponse.body.email).toBe(
        "centraltest@example.com"
    );
});

});


describe("GET /admin", () => {
    test("should reject a normal user", async () => {
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "centraltest@example.com",
                password: "SecurePass123"
            });

        expect(loginResponse.statusCode).toBe(200);

        const token = loginResponse.body.token;

        const response = await request(app)
            .get("/admin")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
    });

    test("should allow an admin to access the admin area", async () => {
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "jest-admin@example.com",
                password: "AdminTestPass123"
            });

        expect(loginResponse.statusCode).toBe(200);

        const token = loginResponse.body.token;

        const response = await request(app)
            .get("/admin")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Welcome to the admin area");
        expect(response.body.user).toBe("jest-admin@example.com");
    });
});



afterAll(async () => {
    await pool.end();
});

