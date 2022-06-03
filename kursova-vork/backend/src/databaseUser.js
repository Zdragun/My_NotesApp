import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('tasksdb', 'root', '888888888', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;