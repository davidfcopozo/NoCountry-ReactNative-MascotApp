require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// const { DB_DEPLOY } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_HOST, {
  logging: false,
  native: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Auth,
  Category,
  Favourite,
  Image,
  JobOffer,
  PetType,
  Pet,
  Request,
  Review,
  UserCategory,
  UserPetType,
  UserReview,
  User
} = sequelize.models;

// Aca vendrian las relaciones
Auth.hasOne(User);
Category.belongsToMany(User, { through: UserCategory });
Favourite.belongsTo(User, { foreignKey: "user_id" });
Image.belongsTo(User, { foreignKey: "user_id" });
JobOffer.belongsTo(User, { foreignKey: "user_id" });
PetType.hasMany(Pet);
PetType.belongsToMany(User, { through: UserPetType });
Pet.belongsTo(User, { foreignKey: "user_id" });
Pet.belongsTo(PetType, { foreignKey: "type_id" });
Request.belongsTo(User, { foreignKey: "client_id" });
Review.belongsTo(User, { through: UserReview });
User.belongsTo(Auth, { foreignKey: "auth_id" });
User.belongsToMany(Category, { through: UserCategory });
User.hasMany(Favourite);
User.hasMany(Image);
User.hasMany(JobOffer);
User.belongsToMany(PetType, { through: UserPetType });
User.belongsToMany(Category, { through: UserCategory });
User.hasMany(Request);
User.hasMany(Review);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize // para importar la conexión { conn } = require('./db.js');
};
