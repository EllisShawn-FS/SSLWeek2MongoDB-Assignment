const Team = require("../models/Team");
const { getAllTeams, getTeamById } = require("../controller/teamController");

jest.mock("../models/Team"); // This lets me fake the Team model so I'm not hitting the real database.

describe("Team Controller Tests", () => {
  test("Should return teams with only selected fields", async () => {

    const req = { query: { fields: "name,city" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock data 
    const mockTeams = [
      { name: "Falcons", city: "Atlanta" },
      { name: "Eagles", city: "Philadelphia" },
    ];


    const mockQuery = {
      select: jest.fn().mockReturnThis(), // simulates .select()
      sort: jest.fn().mockReturnThis(), // simulates .sort()
      skip: jest.fn().mockReturnThis(), // simulates .skip()
      limit: jest.fn().mockReturnThis(), // simulates .limit()
    };

    // This simulates the calling Team.find()
    Team.find = jest.fn().mockReturnValue(mockQuery);
    mockQuery.select.mockReturnValue(mockQuery);
    mockQuery.sort.mockReturnValue(mockQuery);
    mockQuery.skip.mockReturnValue(mockQuery);
    mockQuery.limit.mockReturnValue(Promise.resolve(mockTeams));

    await getAllTeams(req, res);

    // Check for expected response
    expect(Team.find).toHaveBeenCalled();
    expect(mockQuery.select).toHaveBeenCalledWith("name city");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockTeams,
    });
  });
  
  test("Should return a team by ID and populate player names", async () => {
    // Mock team ID
  const req = { params: { id: "123" } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

   // Mock Team Data from ID
  const mockTeam = {
    _id: "123",
    name: "Eagles",
    city: "Philadelphia",
    players: [{ name: "Jalen Hurts" }, { name: "A.J. Brown" }],
  };

  // Mock how Team.findById().select().populate() would work
  Team.findById = jest.fn(() => ({
    select: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockTeam),
    }),
  }));

  await getTeamById(req, res);

  // Check for expected response
  expect(Team.findById).toHaveBeenCalledWith("123");
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: "Team Found",
    data: mockTeam,
  });
});
});