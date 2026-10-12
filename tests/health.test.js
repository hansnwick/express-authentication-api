const request = require("supertest");
const app = require("../app");

describe("GET /health", () => {
    test("should return 200 and a healthy status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            status: "OK",
            message: "Server is healthy"
        });
    });
});

describe("Unknown routes", () => {
    test("should return 404 for an unknown route", async () => {
        const response = await request(app).get("/this-route-does-not-exist");

        expect(response.statusCode).toBe(404);
    });
});