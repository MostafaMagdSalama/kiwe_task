import { getWeatherByLocKey } from "../../dal/weather.dal";
import redis from "../../config/redis";

// Mock `fetch` globally
global.fetch = jest.fn();

// Mock Redis
jest.mock("../../config/redis", () => ({
    set: jest.fn(),
}));



describe("Weather DAL - getWeatherByLocKey", () => {
    const mockKey = "12345";
    const mockWeatherData = { temperature: 25, condition: "Sunny" };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset all mocks before each test
    });

    test("should return weather data and store it in Redis", async () => {
        // Arrange: Mock fetch response
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockWeatherData),
        });

        process.env.WEATHER_KEY = "test-key";
        process.env.WEATHER_BAS_URL = "https://api.weather.com/weather";

        // Act
        const result = await getWeatherByLocKey(mockKey);

        // Assert
        expect(result).toEqual(mockWeatherData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            `https://api.weather.com/weather?key=test-key&q=12345`
        );

        expect(redis.set).toHaveBeenCalledTimes(1);
        expect(redis.set).toHaveBeenCalledWith(mockKey, JSON.stringify(mockWeatherData), "EX", 60 * 60);
    });

    test("should throw an error if fetch fails", async () => {
        // Arrange: Mock fetch failure
        (global.fetch as jest.Mock).mockRejectedValue(new Error("API fetch error"));

        process.env.WEATHER_KEY = "test-key";
        process.env.WEATHER_BAS_URL = "https://api.weather.com/weather";

        // Act & Assert
        await expect(getWeatherByLocKey(mockKey)).rejects.toThrow("API fetch error");

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(redis.set).not.toHaveBeenCalled(); // Redis should not be used if fetch fails
    });
});
