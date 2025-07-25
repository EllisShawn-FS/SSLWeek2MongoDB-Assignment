const { describe } = require("node:test");
const { getAllPlayers, getPlayerById, } = require("../controller/playerController");
const Players = require("../models/Players");

jest.mock("../models/Players"); // This lets me fake the Players model so I'm not hitting the real database.


describe("Get all Players Tests",  () => {
  test("As a user I should return 5 players", async () => {
    // Simulate a basic GET request
      const req = { query: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Creating 5 fake players
      const mockPlayers = Array(5).fill().map((_, i) => ({
        _id: `${i + 1}`,
        name: `Player ${i + 1}`,
        age: 20 + i,
      }));

      
      const mockQuery = {
        select: jest.fn().mockReturnThis(), // Simulates .select()
        sort: jest.fn().mockReturnThis(), // Simulates .sort()
        skip: jest.fn().mockReturnThis(), // Simulates .skip()
        limit: jest.fn().mockReturnThis(), // Simulates .limit()
      };

      // This simulates the calling Players.find()
      Players.find = jest.fn().mockReturnValue(mockQuery);
      mockQuery.select.mockReturnValue(mockQuery);
      mockQuery.sort.mockReturnValue(mockQuery);
      mockQuery.skip.mockReturnValue(mockQuery);
      mockQuery.limit.mockReturnValue(Promise.resolve(mockPlayers));

      await getAllPlayers(req, res);

      // Check for expected response
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockPlayers,
      });
    });

  test("As a user i should return a player by Id", async () => {
    // Mock Player ID
      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    
    // Mock Player Data from ID
      const mockPlayer = {
        _id: "1",
        name: "Mike Vick",
        age: 29,
        team: { name: "Falcons" }
      };

    // Mock how Players.findById().select().populate() would work
      Players.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockPlayer),
        }),
      });

      await getPlayerById(req, res);

      // Check for expected response
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: "Player Found",
          data: mockPlayer,
        });
  });
});