const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//const bodyparser = require('body-parser');
//const bcrypt = require('bcrypt')

//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo
// app.post("/todos", async (req, res) => {
//   console.log(req.body);
//   try {
//      console.log(req.body);
//     const { description, titre, projet, client, assigne, date } = req.body;

//     ({
//       titre:req.body.titre,
//     });
//   const newTodo = await pool.query(
//       "INSERT INTO todo (description, titre, projet, assigne, client, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
//       [description, titre, projet, assigne, client, date ]
 
//     );
//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.log(err);
//     console.error(err.message);
//   }

//   const service = new service({
//     titre:req.body.titre,
//   })
//   service.save()
//   .then(data=>{
//     console.log(data)
//   })
// });

//post dash

app.post("/todos", async (req, res) => { 
  console.log(req.body);
  try {
    console.log(req.body);
    const { description, titre, projet } = req.body;
    ({
      titre: req.body.titre,
    });
    const newTodo = await pool.query(
      "INSERT INTO todo (description, titre, projet) VALUES($1, $2, $3, ) RETURNING *",
      [description, titre, projet]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
    console.error(err.message);
  }
  const service = new service({
    titre: req.body.titre,
  });
  service.save().then((data) => {
    console.log(data);
  });
});

//postttttttt
app.post("/ra", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err.massage);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  console.log("============");
  try {
    //const allTodos = await pool.query("SELECT description,pp.name as project_name,rp.name as tech_name  FROM   project_project as pp, project_tags as ptag,res_partner as rp,project_task as pt WHERE pp.user_id = pt.user_id");
    const allTodos = await pool.query(
      "select description,rp.name as nom_tech, pp.name as nom_projet, pt.name as nom_task, date_deadline from res_partner as rp, project_project as pp,project_task as pt where rp.id = pp.alias_id and pp.user_id = pt.user_id and pt.project_id = pp.id"
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/ahmed", async (req, res) => {
  let description = req.body.description
  let id = Number(req.body.id)
  let confirmation = req.body.confirmation
  console.log(id,description,confirmation)
  try {
    const updateTodo = await pool.query(
      "UPDATE project_task SET x_description = $1, x_confirmation = $3 WHERE id = $2",
      [description, id, confirmation]
    );
  } catch (err) {
    console.error(err);
  }
});


//confirmation

 app.post("/ghada", async (req, res) => {
   let confirmation = req.body.confirmation
   let id = Number(req.body.id)
   console.log(id,confirmation)
   try {
     const updateTodo = await pool.query(
       "UPDATE project_task SET x_confirmaion = $1 WHERE id = $2",
      [confirmation, id]
    );
  } catch (err) {
     console.error(err);
   }
 });


//dash
app.post("/dash", async (req, res) => {
  console.log("============");
  try {
    //const allTodos = await pool.query("SELECT description,pp.name as project_name,rp.name as tech_name  FROM   project_project as pp, project_tags as ptag,res_partner as rp,project_task as pt WHERE pp.user_id = pt.user_id");
    const allTodos = await pool.query("select arch from ir_ui_view_custom");
    console.log(allTodos);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//auth

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

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2", 
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5001, () => {
  console.log("server has started on port 5001");
});
