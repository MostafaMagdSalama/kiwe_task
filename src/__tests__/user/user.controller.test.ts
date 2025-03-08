import { saveFavouriteCity, listFavouriteCities } from "../../controllers/user.controller";
import * as UserService from "../../services/user.service";
import { Request, Response } from "express";
import { logger } from "../../config/Logger";

// Mock UserService functions
jest.mock("../../services/user.service");



describe("User Controller", () => {
    let req: Partial<Request> & { userId?: string };
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        req = { userId: "user123", body: { city: "New York" } };
        res = { json: jsonMock, status: statusMock };

        jest.clearAllMocks(); // Reset mocks before each test
    });

    describe("saveFavouriteCity", () => {
        test("should save favourite city and return success response", async () => {
            // Arrange
            const mockResult = { message: "City saved successfully" };
            (UserService.saveFavouriteCity as jest.Mock).mockResolvedValue(mockResult);

            // Act
            await saveFavouriteCity(req as Request, res as Response);

            // Assert
            expect(UserService.saveFavouriteCity).toHaveBeenCalledWith("user123", "New York");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

    });

    describe("listFavouriteCities", () => {
        test("should return list of favourite cities", async () => {
            // Arrange
            const mockResult = ["New York", "London"];
            (UserService.listFavouriteCities as jest.Mock).mockResolvedValue(mockResult);

            // Act
            await listFavouriteCities(req as Request, res as Response);

            // Assert
            expect(UserService.listFavouriteCities).toHaveBeenCalledWith("user123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ favouriteCities: mockResult });
        });

    });
});
