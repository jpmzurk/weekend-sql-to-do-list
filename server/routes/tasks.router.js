const express = require('express');
const { Router } = require('express');
const tasksRouter = express.Router();


const pool = require('../module/pool.js');

tasksRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM tasks ORDER BY id;';

    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

tasksRouter.post('/', (req, res) => {
    let task = req.body;
    console.log('posting', task);

    let queryText = `INSERT INTO "tasks" ("name", "when", "location", "notes", "status", "tableLocation")
                    VALUES ($1, $2, $3, $4);`
    pool.query(queryText, [task.name, task.when, task.location, task.notes])
        .then(result => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('Error adding Task', error);
            res.sendStatus(500);
        });
});


tasksRouter.put('/edited', (req, res) => {
    let task = req.body;
    console.log('in edited task', task);
    let queryText = `
                    UPDATE tasks
                    SET name = $1,
                        "when" = $2,
                        location = $3,
                        notes = $4
                    WHERE id = $5;
                    `

    pool.query(queryText, [task.name, task.when, task.location, task.notes, Number(task.id)])
        .then(result => {
            console.log(result);
            res.sendStatus(201);
        }).catch(error => {
            console.log('error in post', error);
            res.sendStatus(500);
        });
});



tasksRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('server is deleting task', id);

    let queryText = `
                    DELETE FROM tasks
                    WHERE id = $1;
                    `;

    pool.query(queryText, [req.params.id]).then(result => {
        console.log(result);
        res.sendStatus(201);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})


// tasksRouter.put('/completeTable', (req, res) => {
//     let task = req.body;
//     let task = {
//         status : 'Completed'
//     }

//     console.log('in edited task', task);
//     let queryText = `
//                     UPDATE tasks
//                     SET status = $1
//                     WHERE id = $2;
//                     `

//     pool.query(queryText, [task.status, Number(task.id)])
//         .then(result => {
//             console.log(result);
//             res.sendStatus(201);
//         }).catch(error => {
//             console.log('error in post', error);
//             res.sendStatus(500);
//         });

// });

module.exports = tasksRouter;