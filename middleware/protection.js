const jwt = require("jsonwebtoken");
const userSchema = require("../models/user_model");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    res.status(401).json({
      message: "unauthorized request",
    });
  } else {
    const token = authorization.split(" ")[1];

    let verified;

    try {
      verified = jwt.verify(token, process.env.APP_SECRET);
    } catch (error) {
      res.status(401).json({
        message: "unauthorized request",
      });
    }

    if (verified) {
      const { id } = verified;

      try {
        const user = await userSchema.findById(id, "-password");
        req.user = user;
      } catch (error) {
        console.log(error);
        throw new Error("Cannot read from users");
      }

      next();
    }
  }
});
module.exports = { protect };
