require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

//Conexion  a la Base de Datos 

//Local
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,{
    logging: false,
    native: false,
    define: {
    timestamps: false
    
}})

//Deploy
// const sequelize = new Sequelize(DB_DEPLOY,{
//     logging: false,
//     native: false,
//     define: {
//     timestamps: false
    
// }})

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Product, Review, UserData,Category , PurchaseOrder, ShoppingCart } = sequelize.models;

//Relaciones

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
/* RELACIÓN ENTYRE PRODUCTO y USUARIO = CARRITO */
/* Product.belongsToMany(User, { through: 'Cart' })
User.belongsToMany(Product, { through: 'Cart' })  */




/* RELACIÓN ENTRE PRODUCTO Y REVIEW */
Product.hasMany(Review);
Review.belongsTo(Product);
/* RELACIÓN ENTRE USUARIO Y REVIEW */
User.hasMany(Review);
Review.belongsTo(User);
/* RELACIÓN ENTRE USUARIO Y PERSONALDATA(P/COMPLETAR EN EL PERFIL PARA ENVIO) */
User.hasOne(UserData);
UserData.belongsTo(User);
/* RELACION ENTRE PRODUCTO Y CATEGORIA */
Product.hasMany(Category);
Category.hasMany(Product);
/* RELACIÓN ENTRE USUARIO Y PURCHASEORDER */
User.hasMany(PurchaseOrder);
PurchaseOrder.belongsTo(User);
/* RELACIÓN ENTRE PRODUCTO Y CARRITO */
Product.hasMany(ShoppingCart);
ShoppingCart.belongsTo(Product);
/* RELACIÓN ENTRE USUARIO Y CARRITO */
User.hasMany(ShoppingCart);
ShoppingCart.belongsTo(User);
/* RELACIÓN ENTRE ORDEN Y CARRITO */
PurchaseOrder.hasOne(ShoppingCart)
ShoppingCart.belongsTo(PurchaseOrder);
/* RELACION ENTRE USUARIO Y PRODUCTO */ 
User.belongsToMany(Product,{ through: 'Favourite' });
Product.belongsToMany(User,{ through: 'Favourite' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};