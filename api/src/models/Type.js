const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Type",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
