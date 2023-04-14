const { User, ShippingAddress } = require("../db"); 
const bcrypt = require('bcrypt')
const { v4 } = require("uuid");
const { generateToken } = require("../config/jwt.config");
const { getTokenData } = require("../config/jwt.config");
const {
  getTemplate,
  sendEmail,
  templateAdminInvitation,
  templateSuspensiónDeCuenta,
  sendStatusEmail,
  templateRehabilitacionDeCuenta, 
  templateEliminacionDeCuenta
} = require("../config/mail.config");
const dotenv = require("dotenv");
const sender = process.env.EMAIL

dotenv.config();

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, lastName, userName, email, password } = req.body;
      let user = await User.findOne({
        where: {
          userName,
        },
      });
      let userEmail = await User.findOne({
        where: {
          email,
        },
      });
      let passwordHashed = await bcrypt.hash(password, 10);
      //console.log("linea 30 Users controller", passwordHashed)
      if (user || userEmail) {
        return null, false, console.log("This user name already exists");
      } else {
        const code = v4();
        let user = User.create({
          name,
          lastName,
          userName,
          email,
          password: passwordHashed,
          code,
        });
        const token = generateToken({ email, code });
        const template = getTemplate(name, token);

        await sendEmail(email, "Confirm your account", template);

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
      //return res.redirect("home del deploy")
    } catch (error) {
      return res.json({
        success: false,
        msg: "Error al confirmar usuario",
      });
    }
  },
  getUsers: async (req, res) => {
    const { id } = req.query;

    if(id){
      try {
        const user = await User.findOne({
          where: {
            id,
          },
        });
        if (!user) res.status(404).send({ message: "Usuario inexistente" });
        res.status(200).send(user);
      } catch (error) {
        res.status(400).send("oops I did it again");
      }
    }else{
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        res.json(error);
      }
    }
    
  },

  logInUser: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    try {
      if (!user) res.status(400).send({ message: "Usuario inexitente. Registrate" });
      if(user.disabled === true){
        res.status(400).send({message: "Cuenta de usuario deshabilitada"})
        return
      } 
      if (bcrypt.compare(password, user.password)) res.status(200).send(user);
    } catch (error) {
      res.status(400).send("oops");
    }
  },
  banUser: async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
      },
    });
    const template = templateSuspensiónDeCuenta(user.email, sender)
    await sendStatusEmail(user.email, "Tu cuenta ha sido suspendida", template)
    user.disabled = true;
    user.save();
    res.send({ message: "Usuario inhabilitado" });
  },
  unBanUser: async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
      },
    });
    const template = templateRehabilitacionDeCuenta(user.email, sender)
    await sendStatusEmail(user.email, "Tu cuenta ha sido restaurada", template)
    user.disabled = false;
    user.save();
    res.send({ message: "Usuario habilitado" });
  },
  setAdminRightsToUser: async (req, res) => {
    const { email } = req.body;
    try {
      const newAdmin = await User.findOne({
        where: {
          email,
        },
      });
      console.log(newAdmin);
      if (!newAdmin)
        res.status(400).send({ message: "No existe usuario con este email" });
      newAdmin.admin = true;
      newAdmin.save();
      res.send({
        message: `Derechos administrativos otorgados a ${newAdmin.userName}`,
      });
    } catch (error) {
      res.status(400).send("oops");
    }
  },
  removeAdminRightsToUser: async (req, res) => {
    const { email } = req.body;
    try {
      const newAdmin = await User.findOne({
        where: {
          email,
        },
      });
      console.log(newAdmin);
      if (!newAdmin)
        res.status(400).send({ message: "No existe usuario con este email" });
      newAdmin.admin = false;
      newAdmin.save();
      res.send({
        message: `Derechos administrativos quitados a ${newAdmin.userName}`,
      });
    } catch (error) {
      res.status(400).send("oops");
    }
  },
  createAdmin: async (req, res) => {
    const { name, lastName, userName, email, password } = req.body;
    let passwordHashed = await bcrypt.hash(password, 10);
    try {
      const checkUserName = await User.findOne({
        where: {
          userName,
        },
      });
      const checkUserEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (checkUserName) {
        res
          .status(400)
          .send({ message: "Ya existe un usuario con este nombre" });
      } else if (checkUserEmail) {
        res
          .status(400)
          .send({
            message:
              "Ya existe un usuario registrado con este email. Utilice la función 'setAdminRightsToUser' ",
          });
      } else {
        const code = v4();
        let user = User.create({
          name,
          lastName,
          userName,
          email,
          admin: true,
          password: passwordHashed,
          code,
        });
        const token = generateToken({ email, code });
        const template = templateAdminInvitation(name, token);

        await sendEmail(email, "Confirm your account", template);

        res.json({
          success: true,
          msg: "User successfully registered"
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
  serverAdmin: async (req, res) => {
    let passwordHashed = await bcrypt.hash("proyectofinal", 10)
    let user = await User.findOne({
      where:{
        name: "Grupo 6"
      }
    })
    if(!user){
      const user = await User.create({
        name: "Grupo 6",
        email: "auxiliarparaproyectos@gmail.com",
        admin: true,
        verified: true,
        code : v4(),
        lastName: "Proyecto Final",
        userName: "ElectroShop",
        password: passwordHashed,
        disabled: false
      })
    }
  },
  updateUser: async (req, res) => {
    const { email, name, lastName, cellphone, password } = req.body
    try {
      const user = await User.findOne({
        where: {
          email
        }
      })
      if(name) user.name = name;
      if(lastName) user.lastName = lastName;
      if(cellphone) user.cellphone = cellphone;
      if(password){
        let passwordHashed = await bcrypt.hash(password, 10);
        user.password = passwordHashed;
      } 

      user.save();
      return res.status(200).send({message: "Datos modificados correctamente"})
    } catch (error) {
      res.status(400).send({message: "oops I did it again"})
    }
  },
  deleteUser: async (req, res) => {
    
    const { email } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email
        }
      })
      
      const Addresses = await ShippingAddress.findAll({
        where: {
          UserId: user.id
        }
      })
      const template = templateEliminacionDeCuenta(user.email, sender)
      await sendStatusEmail(user.email, "Tu cuenta ha sido eliminada", template)
      
      for (let i = 0; i < Addresses.length; i++) {
        Addresses[i].destroy();
        
      }
      if(user.email === sender){
        return res.status(400).send({message: `La cuenta ${user.userName} no puede ser eliminada`})
      }
      user.destroy()
      return res.status(200).send({message: "Cuenta de usuario eliminada"})
    } catch (error) {
      res.status(400).send('oops')
    }
    

  }
};
