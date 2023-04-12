const { User, UserData } = require("../db");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { generateToken } = require("../config/jwt.config");
const { getTokenData } = require("../config/jwt.config");
const { getTemplate, sendEmail } = require("../config/mail.config");
const dotenv = require("dotenv");

dotenv.config();
const salt = process.env.BCRYPT_SALT_ROUNDS


module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, lastName, userName, email, password } = req.body;
      let user = await UserData.findOne({
        where: {
          userName,
        },
      });
      console.log("linea 17 Users controller", user)
      let userEmail = await User.findOne({
        where: {
          email,
        },
      });
      console.log("linea 23 Users controller", userEmail)
      //let passwordHashed = await bcrypt.hash(password, salt);
      //console.log("linea 30 Users controller", passwordHashed)
      if (user || userEmail) {
        return(null, false, console.log("This user name already exists"));
      } else {
        const code = v4();
        let user = User.create({ email, code });
        const token = generateToken({ email, code });
        const template = getTemplate(name, token);
        let userData = UserData.create({
          name,
          lastName,
          userName,
          password,
        });
        console.log("linea 38 Users controller", user)
        console.log("linea 39 Users controller", userData)

        await sendEmail(email, "Confirm your account", template);
        // await user.save();
        // await userData.save();

        res.json({
          success: true,
          msg: "User successfully registered",
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        msg: "Something went wrong. Registration has failed",
      });
    }
  },
  confirm: async (req, res) => {
    try {
      const { token } = req.params;

      const data = getTokenData(token);

      if (data === null) {
        return res.json({
          success: false,
          msg: "Error. Data couldn't be acccessed ",
        });
      }

      const { email, code } = data;
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user === null) {
        return res.json({
          success: false,
          msg: "The user doesn't exist",
        });
      }
      if (code !== user.code) {
        return res.redirect("/error.html");
      }
      user.verified = true;
      await user.save();
      return res.redirect("http://localhost:3000/home");
      //return res.redirect("")
    } catch (error) {
      return res.json({
        success: false,
        msg: "Error al confirmar usuario",
      });
    }
  },
  getUsers: async(req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },
  getUsersData: async(req, res) => {
    try {
      const users = await UserData.findAll();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  }
};
