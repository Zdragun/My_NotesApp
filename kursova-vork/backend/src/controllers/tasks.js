import {connect} from '../database';

 class database
{

  constructor()
  {
    
  }


  getTasksByUserId = async (req,res)=>
  {
      const db = await connect();
     const [name] = await db.query("SELECT * FROM tasks WHERE user_id = ?",[req.params.id]);
     
     res.json(name)
     
  }

  getTask = async(req,res)=>
  {
      const connection = await connect();
      const [name] = await connection.query("SELECT * FROM tasks WHERE id = ?",[req.params.id]);
      console.log(name[0])
      res.json(name[0])
  };
     
  
   getTaskCount = async (req,res)=>
  {
       const connection = await connect();
       const [name] = await connection.query("SELECT COUNT(*) FROM tasks WHERE user_id = ?",[req.params.id]);
       res.json(name[0]["COUNT(*)"]);
  }
  
   saveTask = async (req,res)=>
  {
  try{
      const connection = await connect();
      const [results] = await connection.query("INSERT INTO tasks(title, description,user_id) VALUES (?,?,?)", [req.body.title,req.body.description,req.body.user_id])
      console.log(req.body.user_id);
  
      const newUser = {
          id: results.insertId,
          ...req.body,
        };
        res.json(newUser);
      } catch (error) {
        console.error(error);
      }
  };
  
   deleteTask = async (req,res)=>
  {
      const connection = await connect();
    const result = await connection.query("DELETE FROM tasks WHERE id = ?", [req.params.id,]);
    console.log(result);
  
    res.sendStatus(204);
  };
  
  
   updateTask = async (req,res)=>
  {
      const connection = await connect();
    await connection.query("UPDATE tasks SET ? WHERE id = ?", [req.body,req.params.id,
    ]);
    res.sendStatus(204);
  }
  

}

export const taskVork = new database();







