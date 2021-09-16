const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("LotteryState",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stateItems: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        stateSelectedItems: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    })
}
