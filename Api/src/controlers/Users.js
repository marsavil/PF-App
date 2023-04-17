const { User, ShippingAddress } = require("../db");
const bcrypt = require("bcrypt");
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
  templateEliminacionDeCuenta,
  templateAdminSuspension
} = require("../config/mail.config");
const dotenv = require("dotenv");
const sender = process.env.EMAIL;

dotenv.config();

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, lastName, userName, email, password } = req.body;

      if (!name || !lastName || !userName || !email || !password) {
        return res.json({
          success: false,
          msg: "Completa los campos requeridos",
        });
      }

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

      if (user || userEmail) {
        return res.json({
          success: false,
          msg: "El usuario o el email ya existen",
        });
      } else {
        const code = v4();
        let passwordHashed = await bcrypt.hash(password, 10);
        user = await User.create({
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
          msg: "Usuario registrado con éxito",
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        msg: "Error al registrar usuario",
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

    if (id) {
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
    } else {
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

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Por favor, proporciona el email y la contraseña" });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    try {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario inexistente. Regístrate" });
      }
      if (user.disabled === true) {
        return res
          .status(400)
          .send({ message: "Cuenta de usuario deshabilitada" });
      }
      if(user.verified === false){
        return res.status(400).send({message: "Debes confirmar tu cuenta primero. Revisa tu email"})
      }


      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const userFormated = {
          email: user.email,
          admin: user.admin,
          verified: user.verified,
          userName: user.userName,
          name: user.name,
          lastName: user.lastName,
          cellphone: user.cellphone,
          shoppingCart: user.shoppingCart
        };
        const accessToken = generateToken(userFormated) 
        return res.header('authorization', accessToken).status(200).json(accessToken);
      } else {
        return res.status(400).send({ message: "Contraseña incorrecta" });
      }
    } catch (error) {
      return res.status(500).send({message: "rror en el servidor"});
    }
  },
  banUser: async (req, res) => {
    const { id } = req.params;
    
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if(user.email !== sender){
        if(user.disabled === true){
          res.send({message: "Esta cuenta ya se encuentra suspendida"})
        }else{
          const template = templateSuspensiónDeCuenta(user.email, sender);
          await sendStatusEmail(user.email, "Tu cuenta ha sido suspendida", template);
          user.disabled = true;
          user.save();
          return res.send({ message: "Usuario inhabilitado" });
        }
      }else{
        return res.send({message: `La cuenta ${user.userName} no puede ser deshabilitada`})
      }
    } catch (error) {
      return res.status(400).send("oops")
    }
    
    
  },
  unBanUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if(user.disabled === false){
        res.send({message: "Este usuario ya está habilitado"})
      }else{
        const template = templateRehabilitacionDeCuenta(user.email, sender);
        await sendStatusEmail(user.email, "Tu cuenta ha sido restaurada", template);
        user.disabled = false;
        user.save();
        res.send({ message: "Usuario habilitado" });
      }
    } catch (error) {
      res.send("oops")
    }
  },
  setAdminRightsToUser: async (req, res) => {
    const { email } = req.body;
    try {
      const newAdmin = await User.findOne({
        where: {
          email,
        },
      });
      if (!newAdmin){
        return res.status(400).send({ message: "No existe usuario con este email" });
      }else{
        if(newAdmin.admin === true){
          return res.send({message: "Esta cuenta ya tiene derechos administrativos"})
        }else{
          newAdmin.admin = true;
          const token = generateToken({ email, code: newAdmin.code });
          const template = templateAdminInvitation(newAdmin.name, token);
  
          await sendEmail(email, "Invitación", template);
          newAdmin.save();
          return res.send({message: `Derechos administrativos otorgados a ${newAdmin.userName}`,
      });
        }
      }
        
      
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  removeAdminRightsToUser: async (req, res) => {
    const { email } = req.body;
    if(email !== sender){
      try {
        const formerAdmin = await User.findOne({
          where: {
            email,
          },
        });
        if (!formerAdmin)
          res.status(400).send({ message: "No existe usuario con este email" });
          if(formerAdmin.admin === false){
            return res.send({ message: "Esta cuenta no tiene derechos administrativos"})
          }else{
            // const token = generateToken({ email, code: formerAdmin.code });
            //const template = templateAdminSuspension(formerAdmin.name);
    
            //await sendEmail(email, "Revocación", template);
            formerAdmin.admin = false;
            formerAdmin.save();
            return res.send({
            message: `Derechos administrativos quitados a ${formerAdmin.userName}`,
            });
          } 
      } catch (error) {
        res.status(400).send(error.message);
      }
    }else{
      return res.status(400).send({ message: "No es posible quitarle derechos administrativos a esta cuenta"})
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
        res.status(400).send({
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

        await sendEmail(email, "Invitación", template);

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
  serverAdmin: async (req, res) => {
    let passwordHashed = await bcrypt.hash("proyectofinal", 10);
    let user = await User.findOne({
      where: {
        name: "Grupo 6",
      },
    });
    if (!user) {
      const user = await User.create({
        name: "Grupo 6",
        email: "auxiliarparaproyectos@gmail.com",
        admin: true,
        verified: true,
        code: v4(),
        lastName: "Proyecto Final",
        userName: "ElectroShop",
        password: passwordHashed,
        disabled: false,
      });
    }
  },
  updateUser: async (req, res) => {
    const { email, name, lastName, cellphone, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (name) user.name = name;
      if (lastName) user.lastName = lastName;
      if (cellphone) user.cellphone = cellphone;
      if (password) {
        let passwordHashed = await bcrypt.hash(password, 10);
        user.password = passwordHashed;
      }

      user.save();
      return res
        .status(200)
        .send({ message: "Datos modificados correctamente" });
    } catch (error) {
      res.status(400).send({ message: "oops I did it again" });
    }
  },
  deleteUser: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      const Addresses = await ShippingAddress.findAll({
        where: {
          UserId: user.id,
        },
      });
      const template = templateEliminacionDeCuenta(user.email, sender);
      await sendStatusEmail(
        user.email,
        "Tu cuenta ha sido eliminada",
        template
      );

      for (let i = 0; i < Addresses.length; i++) {
        Addresses[i].destroy();
      }
      if (user.email === sender) {
        return res.status(400).send({
          message: `La cuenta ${user.userName} no puede ser eliminada`,
        });
      }
      user.destroy();
      return res.status(200).send({ message: "Cuenta de usuario eliminada" });
    } catch (error) {
      res.status(400).send("oops");
    }
  },
};
