const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {
        type: String, 
        required:true, 
        minlength: 5
    },
    completed: {
        type: Boolean, 
        default: false,
    }
})

todoSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString();
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Todo', todoSchema);