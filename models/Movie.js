const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        // maxLength: 15
    },
    runtime:{
        type: Number
        // min: 1,                //movie min 1 hr ki ho
        // max: [5,"movie runtime can't exceed 5hrs"]         //array used to pass message
    },

    year:{
        type: String,
        required: true
    },

    images:{
        type: String,
        required: true
    }
});


const Movie = mongoose.model("Movie",movieSchema);
module.exports = Movie;