const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
            validate: {
                is: /^[a-z0-9_]{3,20}$/,
            },
            // Entre 3 y 20 caracteres, solo letras minusculas, numeros y guiones bajos
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
            // Regex email
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?=.*\d)(?=.*[A-Z])(?!.*\s).{6,15}$/,
            },
            // Entre 6 y 15 digitos, al menos una mayuscula y un numero y que no contenga espacios en blanco
        },
    });
};
