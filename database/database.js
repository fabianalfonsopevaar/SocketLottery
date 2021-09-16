const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: "postgres",
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }
});
sequelize.options.logging = false //Set loggin output to false

//TODO: Import all the models as below
const LotteryStateModel = require("../models/LotteryStateModel")


//TODO: Create the actual models as below
const LotteryState = LotteryStateModel(sequelize)


// Chapter.hasMany(ChapterInfo, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});
// ChapterInfo.belongsTo(Chapter, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});

var resetDb = { force:false };
sequelize.sync( resetDb ).then( async () => {
    console.log("DB Connection stablished")
}).catch(err => {
    console.log(err)
})

module.exports = {
    sequelize,
    LotteryState,
}
