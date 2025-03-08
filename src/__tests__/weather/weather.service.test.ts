import { getWeatherByLocKey } from "../../services/weather.service";
import * as weatherDal from "../../dal/weather.dal";


// Mock the DAL module
jest.mock("../../dal/weather.dal");

describe("Weather Service - getWeatherByLocKey", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mocks after each test
    });

    test("should return weather data for a valid location key", async () => {
        // Arrange
        const mockKey = "12345";
        const mockWeatherData = { temperature: 25, condition: "Sunny" };

        // Mock DAL function to return fake weather data
        (weatherDal.getWeatherByLocKey as jest.Mock).mockResolvedValue(mockWeatherData);

        // Act
        const result = await getWeatherByLocKey(mockKey);

        // Assert
        expect(result).toEqual(mockWeatherData);
        expect(weatherDal.getWeatherByLocKey).toHaveBeenCalledTimes(1);
        expect(weatherDal.getWeatherByLocKey).toHaveBeenCalledWith(mockKey);
    });

    test("should throw an error if weatherDal.getWeatherByLocKey fails", async () => {
        // Arrange
        const mockKey = "12345";
        const mockError = new Error("Failed to fetch weather data");

        // Mock DAL function to throw an error
        (weatherDal.getWeatherByLocKey as jest.Mock).mockRejectedValue(mockError);

        // Act & Assert
        await expect(getWeatherByLocKey(mockKey)).rejects.toThrow("Failed to fetch weather data");

        expect(weatherDal.getWeatherByLocKey).toHaveBeenCalledTimes(1);
    });
});