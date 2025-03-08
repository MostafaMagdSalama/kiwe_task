import { createUser, login } from "../../services/auth.service";
import * as authDal from "../../dal/auth.dal";
import jwt from "jsonwebtoken";
import { HttpError } from "../../errors/http-error";

// Mock dependencies
jest.mock("../../dal/auth.dal");
jest.mock("jsonwebtoken");


describe("Auth Service", () => {
    const mockUser = {
        _id: "user123",
        comparePassword: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    describe("createUser", () => {
        test("should create a new user successfully", async () => {
            // Arrange
            (authDal.createUser as jest.Mock).mockResolvedValue({ _id: "user123", userName: "testUser" });

            // Act
            const result = await createUser("testUser", "testPass");

            // Assert
            expect(authDal.createUser).toHaveBeenCalledWith("testUser", "testPass");
            expect(result).toEqual({ _id: "user123", userName: "testUser" });
        });

        test("should throw an error if user creation fails", async () => {
            // Arrange
            const error = new Error("DB error");
            (authDal.createUser as jest.Mock).mockRejectedValue(error);

            // Act & Assert
            await expect(createUser("testUser", "testPass")).rejects.toThrow("DB error");
            expect(authDal.createUser).toHaveBeenCalledWith("testUser", "testPass");
        });
    });

    describe("login", () => {
        test("should return a token when login is successful", async () => {
            // Arrange
            mockUser.comparePassword.mockResolvedValue(true);
            (authDal.getUser as jest.Mock).mockResolvedValue(mockUser);
            (jwt.sign as jest.Mock).mockReturnValue("mocked_token");

            // Act
            const result = await login("testUser", "testPass");

            // Assert
            expect(authDal.getUser).toHaveBeenCalledWith("testUser");
            expect(mockUser.comparePassword).toHaveBeenCalledWith("testPass");
            expect(jwt.sign).toHaveBeenCalledWith({ userId: "user123" }, expect.any(String), { expiresIn: "1h" });
            expect(result).toBe("mocked_token");
        });

        test("should throw HttpError with status 401 if username is incorrect", async () => {
            // Arrange
            (authDal.getUser as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(login("wrongUser", "password")).rejects.toThrow(HttpError);
            await expect(login("wrongUser", "password")).rejects.toThrow("Username or password is incorrect");

            try {
                await login("wrongUser", "password");
            } catch (error) {
                expect(error).toBeInstanceOf(HttpError);
                expect((error as HttpError).statusCode).toBe(401);
            }
        });

        test("should throw HttpError with status 401 if password is incorrect", async () => {
            // Arrange
            mockUser.comparePassword.mockResolvedValue(false);
            (authDal.getUser as jest.Mock).mockResolvedValue(mockUser);

            // Act & Assert
            await expect(login("testUser", "wrongPass")).rejects.toThrow(HttpError);
            await expect(login("testUser", "wrongPass")).rejects.toThrow("Username or password is incorrect");

            try {
                await login("testUser", "wrongPass");
            } catch (error) {
                expect(error).toBeInstanceOf(HttpError);
                expect((error as HttpError).statusCode).toBe(401);
            }
        });
    });
});
