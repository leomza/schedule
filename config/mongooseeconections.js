const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/schedule", { useNewUrlParser: true }, function(error){
        if (error){
            throw error;
        } else {
            console.log('Connected to MongoDB');
        }
    })

    module.exports = mongoose;