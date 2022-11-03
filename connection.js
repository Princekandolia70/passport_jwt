// sequelize connection with database

const { Sequelize, DataTypes } = require('sequelize')
const logger = require('./logger')

const sequelize = new Sequelize('interviewtest', 'root', '', {
    host: 'localhost', //hostname or ip address 
    dialect: 'mysql',  //database service
    pool: { max: 5, min: 0, idle: 1000 },
    port: 3307,
    logging: false
})
// Check to authenticate databasename,username,password
sequelize.authenticate()
    .then(() => {
        logger.info('Database connected properly');
    })
    .catch(err => {
        logger.error(`Database not connected properly bcz ${err.message}`)
    })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//Now we need to sync user model in database we use

db.blogs = require('./models/blog')(sequelize, DataTypes)
module.exports = db;

