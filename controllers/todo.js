const express = require("express");
const Todo = require("../models/todo");

const todoRouter = express.Router();

// get all todos
todoRouter.get('/', (request, response) => {
    Todo.find({}).then((todos)=> {
        response.json(todos);
    })
})

//get all the todos by ID
todoRouter.get("/:id", (request, response, next) => {
    Todo.findById(request.params.id)
    .then((todos)=> {
        if(todos) {
            response.json(todos)
        }
        else {
            response.status(404).end();
        }
    })
    .catch((error) => {
        next(error);
    })
})

// add todo in the list (POST) request
todoRouter.post("/", (request, response, next) => {
    const  body = request.body;

    const newTodo = new Todo({
        content: body.content, 
        completed: body.completed || false
    })

    newTodo.save()
    .then((updatedList) => {
        response.json(updatedList);
    })
    .catch((error) => {
        next(error);
    })
})

// delete todo by its ID
todoRouter.delete("/:id", (request, response, next) => {
    Todo.findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end();
    })
    .catch((error) => {
        next(error);
    })
})


// update the todo by its ID
todoRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const TodoToUpdate = {
        content: body.content, 
        completed: body.completed || false
    }

    Todo.findByIdAndUpdate(request.params.id, TodoToUpdate, {new: true})
    .then((updatedTodos) => {
        response.json(updatedTodos);
    })
    .catch((error) => {
        next(error)
    })
})

module.exports = todoRouter;