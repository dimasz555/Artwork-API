const { users } = require("../models"),
  utils = require("../utils"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
require("dotenv").config();
const secret_key = process.env.JWT_KEY || "no_secret";

module.exports = {
  register: async (req, res) => {
    try {
      // check if the email already exists
      const findUser = await users.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (findUser) {
        return res.status(404).json({
          error: "Your email already registered",
        });
      }

      const data = await users.create({
        data: {
          email: req.body.email,
          password: await utils.cryptPassword(req.body.password),
          name: req.body.name,
          profile: {
            create: {
              gender: req.body.gender,
              phone: req.body.phone,
              address: req.body.address,
            },
          },
        },
        include: {
          profile: true,
        },
      });
      return res.status(201).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const findUser = await users.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (!findUser) {
        return res.status(404).json({
          error: "Your email is not registered",
        });
      }

      if (bcrypt.compareSync(req.body.password, findUser.password)) {
        const token = jwt.sign(
          { id: findUser.id, email: findUser.email },
          secret_key,
          { expiresIn: "5h" }
        );
        return res.status(200).json({
          data: {
            token,
          },
        });
      }
      return res.status(403).json({
        error: "Invalid credentials",
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await users.findUnique({
        where: {
          id: res.user.id,
        },
        include: {
          profile: {
            select: {
              gender: true,
              phone: true,
              address: true,
              user_id: true,
            },
          },
        },
      });
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
};
