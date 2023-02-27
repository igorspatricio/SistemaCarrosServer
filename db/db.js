const Sequelize = require('sequelize');

    
const sequelize = new Sequelize(
    'postgres://igor:rleI7gvXR6pTK4xesEDb2fF393N9W0oh@dpg-cft0tmpa6gdotcckhj9g-a.oregon-postgres.render.com/revisaocarros',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true,
            native:true
        }
    }
);
    



module.exports = sequelize;