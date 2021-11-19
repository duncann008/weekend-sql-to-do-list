const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/taskRouter.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));




app.use('/tasks', taskRouter);


app.listen(PORT, () =>  {
    console.log('You are on PORT:', PORT);
});