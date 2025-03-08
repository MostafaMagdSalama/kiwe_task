import { saveFavouriteCity, listFavouriteCities } from "../../services/user.service";
import * as saveFavouriteCityDal from "../../dal/save-favourite-city.dal";
import * as listFavouriteCitiesDal from "../../dal/list-favourite-cities.dal";

// Mock DAL modules
jest.mock("../../dal/save-favourite-city.dal");
jest.mock("../../dal/list-favourite-cities.dal");

// Mock logger to avoid actual logging during tests

describe("User Service", () => {
    const mockUserId = "user123";
    const mockCity = "New York";

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    describe("saveFavouriteCity", () => {
        test("should save favourite city using DAL function", async () => {
            // Arrange
            const mockResult = { message: "City saved successfully" };
            (saveFavouriteCityDal.saveFavouriteCity as jest.Mock).mockResolvedValue(mockResult);

            // Act
            const result = await saveFavouriteCity(mockUserId, mockCity);

            // Assert
            expect(result).toEqual(mockResult);
            expect(saveFavouriteCityDal.saveFavouriteCity).toHaveBeenCalledTimes(1);
            expect(saveFavouriteCityDal.saveFavouriteCity).toHaveBeenCalledWith(mockUserId, mockCity);
        });

        test("should throw an error if DAL fails", async () => {
            // Arrange
            const mockError = new Error("Database error");
            (saveFavouriteCityDal.saveFavouriteCity as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(saveFavouriteCity(mockUserId, mockCity)).rejects.toThrow("Database error");
            expect(saveFavouriteCityDal.saveFavouriteCity).toHaveBeenCalledTimes(1);
        });
    });

    describe("listFavouriteCities", () => {
        test("should return list of favourite cities from DAL", async () => {
            // Arrange
            const mockFavouriteCities = ["New York", "London"];
            (listFavouriteCitiesDal.listFavouriteCities as jest.Mock).mockResolvedValue(mockFavouriteCities);

            // Act
            const result = await listFavouriteCities(mockUserId);

            // Assert
            expect(result).toEqual(mockFavouriteCities);
            expect(listFavouriteCitiesDal.listFavouriteCities).toHaveBeenCalledTimes(1);
            expect(listFavouriteCitiesDal.listFavouriteCities).toHaveBeenCalledWith(mockUserId);
        });

        test("should throw an error if DAL fails", async () => {
            // Arrange
            const mockError = new Error("Database error");
            (listFavouriteCitiesDal.listFavouriteCities as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(listFavouriteCities(mockUserId)).rejects.toThrow("Database error");
            expect(listFavouriteCitiesDal.listFavouriteCities).toHaveBeenCalledTimes(1);
        });
    });
});
