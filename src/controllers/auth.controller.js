const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



// registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // get info from req body
    const isUserAlreadyExisted = await userModel.findOne({
      // check user already exist or not on the basis of email and username ---> as both are set to be unique
      $or: [{ username }, { email }], // Logical OR cond apply here
    });
    if (isUserAlreadyExisted) {
      return res.status(400).json({
        message: "bsdke nashe mai hai kya",
      });
    }

    const hash = await bcrypt.hash(String(password), 10); // hashing the password(String only)
    const user = await userModel.create({
      // save into the database
      username,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      // after saving into the db, server creates the token
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token); // then token send as a respose by coookie (saved in the cookie) server anytime get the cookie
    res.status(200).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("error in User registration", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// login-- by the username and email both
const loginUser = async (req, res) => {
  const { username, email, password } = req.body; // get user detail from the req body

  const user = await userModel.findOne({ // find user in db
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // if user exist, then check password is valid or not
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid credentails",
    });
  }

  // login karne par bhi token bhjta hai
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};

//logout
const logoutUser = async(req,res)=>{
  res.clearCookie("token")
  res.status(200).json({message:"user logged out successfully"})
}

module.exports = { registerUser, loginUser, logoutUser};
