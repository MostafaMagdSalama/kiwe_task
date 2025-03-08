import { getWeatherByLocKey } from "../../services/weather.service";
import * as weatherDal from "../../dal/weather.dal";



// Mock the weatherDal module
jest.mock("../../dal/weather.dal");

describe("Weather Service - getWeatherByLocKey", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should return weather data for a given location key", async () => {
        // Arrange
        const mockKey = "12345";
        const mockWeatherData = { temperature: 25, condition: "Sunny" };

        // Mocking the DAL function to return mock data
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

        (weatherDal.getWeatherByLocKey as jest.Mock).mockRejectedValue(mockError);

        // Act & Assert
        await expect(getWeatherByLocKey(mockKey)).rejects.toThrow("Failed to fetch weather data");
        expect(weatherDal.getWeatherByLocKey).toHaveBeenCalledTimes(1);
    });
});
