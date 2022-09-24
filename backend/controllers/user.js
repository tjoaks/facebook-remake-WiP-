const { validateEmail, validateLength } = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address.",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "An account already exists with this email address.",
      });
    }

    if (!validateLength(first_name, 1, 30)) {
      return res.status(400).json({
        message: "First name must be between 1 and 30 characters.",
      });
    }

    if (!validateLength(last_name, 1, 30)) {
      return res.status(400).json({
        message: "Last name must be between 1 and 30 characters.",
      });
    }

    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    //  console.log(cryptedPassword);

    newUsername = "";
    tempUsername = first_name + last_name;
    randomNumber = Math.floor(Math.random() * 9);
    targetUsername = tempUsername;
    // console.log("tempUsername is " + tempUsername);

    const userCheck = await User.findOne({ first_name, last_name });
    {
      if (userCheck) {
        newUsername = tempUsername + randomNumber;
        /* res.status(200).json({
          message: "Username already taken. Assigning new username.",
        }); */
      } else {
        newUsername = first_name + last_name;
        res.status(200).json;
      }
    }

    // console.log("newUsername is " + newUsername);

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Registration Successful. Please Verify Your Account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already verified." });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been verified successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "This email is not connected to an account." });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Password is invalid." });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Registration Successful. Please Verify Your Account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
