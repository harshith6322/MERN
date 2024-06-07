const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic

  const username = req.headers.username;
  const password = req.headers.password;

  const userExist = await User.findOne({
    username,
  });
  console.log(userExist);
  if (!userExist) {
    await User.create({
      username,
      password,
    });
    res.json({
      msg: "user is created ✔️",
    });
  } else {
    res.json({
      msg: "username already exist use another username",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;
  console.log(JWT_SECRET, username, password);

  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and pass",
    });
  }
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
