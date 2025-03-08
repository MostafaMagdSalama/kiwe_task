import { listFavouriteCities } from "../../dal/list-favourite-cities.dal";
import { saveFavouriteCity } from "../../dal/save-favourite-city.dal";
import UserModel from "../../models/User.model";

// Mock Mongoose Model
jest.mock("../../models/User.model");


describe("listFavouriteCities DAL", () => {
    const mockUserId = "user123";

    beforeEach(() => {
        jest.clearAllMocks(); // Reset all mocks before each test
    });

    test("should return user's favourite cities if user exists", async () => {
        // Arrange
        const mockFavouriteCities = ["New York", "London"];
        (UserModel.findOne as jest.Mock).mockResolvedValue({
            favouriteCities: mockFavouriteCities,
        });

        // Act
        const result = await listFavouriteCities(mockUserId);

        // Assert
        expect(result).toEqual(mockFavouriteCities);
        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockUserId });
    });

    test("should return 'User not found' if user does not exist", async () => {
        // Arrange
        (UserModel.findOne as jest.Mock).mockResolvedValue(null);

        // Act
        const result = await listFavouriteCities(mockUserId);

        // Assert
        expect(result).toEqual({ success: false, message: "User not found" });
        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockUserId });
    });

    test("should throw an error if database query fails", async () => {
        // Arrange
        const mockError = new Error("Database error");
        (UserModel.findOne as jest.Mock).mockRejectedValue(mockError);

        // Act & Assert
        await expect(listFavouriteCities(mockUserId)).rejects.toThrow("Database error");

        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockUserId });
    });
});

describe("saveFavouriteCity DAL", () => {
    const mockUserId = "user123";
    const mockCity = "New York";

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    test("should add a new favourite city if user exists", async () => {
        // Arrange: Mock user found and city successfully added
        (UserModel.findOne as jest.Mock).mockResolvedValue({ _id: mockUserId, favouriteCities: [] });
        (UserModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

        // Act
        const result = await saveFavouriteCity(mockUserId, mockCity);

        // Assert
        expect(result).toEqual({ success: true, message: "City added successfully" });
        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockUserId });
        expect(UserModel.updateOne).toHaveBeenCalledWith(
            { _id: mockUserId },
            { $addToSet: { favouriteCities: mockCity } }
        );
    });

    test("should return 'City already exists' if city is not added", async () => {
        // Arrange: Mock user found but city already exists (modifiedCount = 0)
        (UserModel.findOne as jest.Mock).mockResolvedValue({ _id: mockUserId, favouriteCities: [mockCity] });
        (UserModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 0 });

        // Act
        const result = await saveFavouriteCity(mockUserId, mockCity);

        // Assert
        expect(result).toEqual({ success: false, message: "City already exists" });
        expect(UserModel.updateOne).toHaveBeenCalledWith(
            { _id: mockUserId },
            { $addToSet: { favouriteCities: mockCity } }
        );
    });

    test("should return 'User not found' if user does not exist", async () => {
        // Arrange: Mock user not found
        (UserModel.findOne as jest.Mock).mockResolvedValue(null);

        // Act
        const result = await saveFavouriteCity(mockUserId, mockCity);

        // Assert
        expect(result).toEqual({ success: false, message: "User not found" });
        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockUserId });
    });

    test("should throw an error if database query fails", async () => {
        // Arrange: Mock database error
        const mockError = new Error("Database error");
        (UserModel.findOne as jest.Mock).mockRejectedValue(mockError);

        // Act & Assert
        await expect(saveFavouriteCity(mockUserId, mockCity)).rejects.toThrow("Database error");

        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockUserId });
    });
});
