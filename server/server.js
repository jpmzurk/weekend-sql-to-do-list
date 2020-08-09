const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasks.router');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


// ROUTES
app.use('/tasks', tasksRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

