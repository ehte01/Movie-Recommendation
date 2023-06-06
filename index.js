const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const axios = require('axios');
const Movie = require('./models/Movie');
const { isArray } = require('util');
const port = 4000;

mongoose.connect("mongodb://localhost/movies-recomm").then(()=>{
    console.log("connection open");
}).catch((e)=>{
    console.log("Error during database connection",e);
})
app.set('view engine',"ejs");
app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));   //to access public folder
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/",(req,res)=>{
    const {search} = req.body;
    console.log(search);
    axios.get(`https://api.tvmaze.com/search/shows?q=${search}`).then((res)=>{
        console.log(res.data);
        let movies = res.data;

        movies.forEach((movie)=>{
            Movie.create({
                name: movie.show.name,
                runtime: movie.show.runtime,
                year: movie.show.premiered,
                images: movie.show.image.medium
            })
        });
    })
});

app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`);
});
