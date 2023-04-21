const server = require("./src/app.js");
const { addProducts } = require("./src/controlers/products.js");
const { serverAdmin } = require("./src/controlers/Users.js");
const { conn } = require("./src/db.js");

require("dotenv").config();

const PORT = process.env.PORT;
// Syncing all the models at once.

<<<<<<< HEAD
conn.sync({ force: false}).then(() => { 
=======
conn.sync({ force: false }).then(() => {
>>>>>>> 5b749103dfd87afd3542f9c073c3e7ed80479264
  server.listen(PORT, () => {
    serverAdmin();
    addProducts();
    console.log(`listening to ${PORT}`); // eslint-disable-line no-console
  });
});
