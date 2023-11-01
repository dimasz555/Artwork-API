const { users } = require("../models");
require("dotenv").config();

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await users.findMany({
        select: {
          id : true,
          name: true,
          email: true,
        },
      });
      res.json(user);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
};
