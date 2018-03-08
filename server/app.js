const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const mockData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];
// add your code here
app.use(morgan("dev"));
app.use(bodyParser.json());

// write your code to respond "ok" here
app.get('/', (req, res) => {
    res.status(200).json();
    // console.log('ok');
});
app.get("/api/TodoItems/", (req, res) => {
    res.status(200).send(mockData);
});

app.get("/api/TodoItems/:number", (req, res) => {
    const number = req.params.number
    const todo = mockData.find(function (obj) { return obj.todoItemId == number; });
    res.status(200).send(todo);
    // console.log('yup');
});

app.post("/api/TodoItems/", (req, res) => {
        const newTodo = {
            todoItemId: mockData.length,
            name: req.body.name,
            priority: req.body.priority,
            completed: req.body.completed
        }
        mockData.push(newTodo); 
        res.status(201).json(req.body);
    });
// app.post("/api/TodoItems/", (req, res, next) => {
//     mockData.push(req.body);
//     console.log(req.body);
//     res.status(201).json(req.body);
// });
//send(newTodo)
app.delete('/api/TodoItems/:id', function (req, res) {
    let delObj = [];
    const delId = req.params.id;
    for (i = 0; i < mockData.length; i++) {
        if (delId == mockData[i].todoItemId) {
            delObj = mockData.splice(i, 1);
        }
    }

    res.status(200).send(delObj[0]);
})
// app.delete("/api/TodoItems/:number", (req, res) => {
//  let mockNum = new object ()   
//  for(i = 0; i < arr.length; i++) {

//     }
//     res.send(data[req.params.number]);
//     data.splice(req.params.number, 1);
// });


module.exports = app;


// app.post("/api/TodoItems/", (req, res) => {
//     const newTodo = {
//         todoItemId: mockData.length,
//         name: req.body.name,
//         priority: req.body.priority,
//         completed: req.body.completed
//     }
//     mockData.push(newTodo); 
//     res.status(201).send(newTodo)
// });

// function findObjectByKey(array, key, value) {
//     for (var i = 0; i < array.length; i++) {
//         if (array[i][key] === value) {
//             return array[i];
//         }
//     }
//     return null;
// }

// var objOne = findObjectByKey(objArray, 'id', 1);
// var objTwo = findObjectByKey(objArray, 'id', 2);
// var objThree = findObjectByKey(objArray, 'id', 3);

//arr.filter(e => e.prop === someValue);
