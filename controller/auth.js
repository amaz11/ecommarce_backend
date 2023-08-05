const userModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// hassPasswor
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//Sign up
const signup = async (req, res) => {
  const { name, phone, password, conpassword, role } = req.body;
  if (!name || !phone || !password || !conpassword) {
    return res.status(400).json({ error: "Fill The Form" });
  }
  if (name.length < 6 || password.length < 6) {
    return res.status(400).json({ error: "Name & Password need 6 Character" });
  }
  const existUser = await userModel.findOne({ phone });

  if (existUser) {
    return res.status(400).json({ error: "This phone Already Exist" });
  }
  const existUsername = await userModel.findOne({ name });

  if (existUsername) {
    return res.status(400).json({ error: "This Name Already Exist" });
  }
  try {
    if (password === conpassword) {
      const user = await new userModel({
        name,
        phone,
        password,
        role,
      });
      user.password = await hashPassword(user.password);
      await user.save();
      user.password = undefined;
      res.status(201).json({ user, massage: "Registretion Successfull" });
    } else {
      return res.status(400).json({ error: "Password Not Match" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//Sign In
const signin = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ error: "Fill The Form" });
  }
  try {
    const user = await userModel.findOne({ phone });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const options = {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        };
        const token = await jwt.sign(
          {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        // console.log(req.cookies.jwt);
        return res.status(200).cookie("jwt", token, options).json({
          message: "Sign in Success",
          data: user,
          access_token: token,
        });
      } else {
        return res
          .status(400)
          .json({ error: "Invalid Info or Need Registretion" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid Info or Need Registretion" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await userModel.findOne({ _id }).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Something Wrong" });
  }
};

const signout = (req, res) => {
  return res.status(200).clearCookie("jwt").json({
    message: "Sign Out",
  });
};
module.exports = { signup, signin, signout, getUser };
