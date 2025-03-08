import { authController, login } from "../../controllers/auth.controller";
import * as authService from "../../services/auth.service";
import { Request, Response, NextFunction } from "express";

// Mock authService functions
jest.mock("../../services/auth.service");

describe("Auth Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        req = { body: { userName: "testUser", password: "testPass" } };
        res = { json: jsonMock, status: statusMock };

        jest.clearAllMocks(); // Reset mocks before each test
    });

    describe("authController (Register)", () => {
        test("should register a new user and return success response", async () => {
            // Arrange
            (authService.createUser as jest.Mock).mockResolvedValue(undefined);

            // Act
            await authController(req as Request, res as Response);

            // Assert
            expect(authService.createUser).toHaveBeenCalledWith("testUser", "testPass");
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "User registered successfully" });
        });

    });

    describe("login", () => {
        test("should return a token when login is successful", async () => {
            // Arrange
            const mockToken = "mocked_token";
            (authService.login as jest.Mock).mockResolvedValue(mockToken);

            // Act
            await login(req as Request, res as Response);

            // Assert
            expect(authService.login).toHaveBeenCalledWith("testUser", "testPass");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: mockToken });
        });
    });

});
