const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');


router.get('/youssef', (req,res)=>{
    console.log({name: 'hello'})
})


router.post('/login', (req, res) => {
  try {
    //const allTodos = await pool.query("SELECT description,pp.name as project_name,rp.name as tech_name  FROM   project_project as pp, project_tags as ptag,res_partner as rp,project_task as pt WHERE pp.user_id = pt.user_id");
    const allTodos = await pool.query('select count from res_users where login='+'hello'+';');
    console.log (allTodos)
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message); 
  }
});



//get a todo
/*app.get("/todos", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});*/

router.get('/ahmed',(req, res)=>{
  console.log("sh")
})

module.exports = router;

