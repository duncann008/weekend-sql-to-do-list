const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool.js');




// GET ROUTE
taskRouter.get('/', (req, res) =>   {
    console.log('GET /tasks');
    const table = `SELECT * FROM tasks
                    ORDER BY "complete", "task" ASC;`;
    pool.query(table)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((dbErr) =>   {
            console.error(dbErr);
            res.sendStatus(500);
        });
});

// POST ROUTE
taskRouter.post('/', (req, res) =>  {
   
    let newTask = req.body;

    console.log('Adding task', newTask);
    
    let queryText = `INSERT INTO "tasks" ("task")
                        VALUES ($1);`;

    let queryValues = [
        newTask.task
    ];

    pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) =>   {
            res.sendStatus(500);
            console.log(error);
        })
});


// PUT ROUTE
taskRouter.put('/:id', (req, res) => {
    const taskIdToUpdate = req.params.id;
    const sqlText = `
      UPDATE "tasks"
        SET "complete" = NOT "complete"
            WHERE "id"=$1;
    `;
    const sqlValues = [
      taskIdToUpdate
    ];
  
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      })
});
  

// DELETE ROUTE
taskRouter.delete('/:id', (req, res) =>  {
    const taskIdToDelete = req.params.id;
    const sqlText = `
      DELETE FROM "tasks"
        WHERE "id"=$1;
    `;
    const sqlValues = [taskIdToDelete];
    pool.query(sqlText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      })
  });











module.exports = taskRouter;