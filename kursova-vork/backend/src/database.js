const mysql = require('mysql2/promise');
import {config} from './config';

export const connect = async () =>
{
    return await mysql.createConnection(config);
/*   const [name] =  await conn.query('SELECT title FROM tasks WHERE id = 1');
   console.log(name); */

};
