import { createUser, getUser } from "../../dal/auth.dal";
import UserModel from "../../models/User.model";

jest.mock("../../models/User.model");

describe("Auth DAL", () => {
    const mockUser = {
        _id: "user123",
        userName: "testUser",
        password: "hashedPassword",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createUser", () => {
        test("should create a new user successfully", async () => {
            // Arrange
            (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

            // Act
            await createUser("testUser", "testPass");

            // Assert
            expect(UserModel.create).toHaveBeenCalledWith({
                userName: "testUser",
                password: "testPass",
            });
        });

    });

    describe("getUser", () => {
        test("should return user data when user exists", async () => {
            // Arrange
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

            // Act
            const result = await getUser("testUser");

            // Assert
            expect(UserModel.findOne).toHaveBeenCalledWith({ userName: "testUser" });
            expect(result).toEqual(mockUser);
        });

        test("should return null if user does not exist", async () => {
            // Arrange
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await getUser("nonExistentUser");

            // Assert
            expect(UserModel.findOne).toHaveBeenCalledWith({ userName: "nonExistentUser" });
            expect(result).toBeNull();
        });

    });
});
