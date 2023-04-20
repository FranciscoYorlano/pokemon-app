const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Pokemon", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        life: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
        speed: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        height: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
        weight: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            },
        },
    });
};
