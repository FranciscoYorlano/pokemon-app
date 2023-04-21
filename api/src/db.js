const { Sequelize } = require("sequelize");

// ======================== Models requires
const pokemonDefiner = require("./models/Pokemon");
const typeDefiner = require("./models/Type");
const userDefiner = require("./models/User");

// ======================== Sequelize
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
        logging: false,
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

// ======================== Models definers
pokemonDefiner(sequelize);
typeDefiner(sequelize);
userDefiner(sequelize);
const { Pokemon, Type, User } = sequelize.models;

// ======================== Models relations
Type.belongsToMany(Pokemon, { through: "PokemonsTypes" });
Pokemon.belongsToMany(Type, { through: "PokemonsTypes" });

Pokemon.belongsToMany(User, { through: "UsersPokemons" });
User.belongsToMany(Pokemon, { through: "UsersPokemons" });

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,
};
