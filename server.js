var fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res)=>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/', (req, res)=>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

module.exports = function(app){
    app.get('/api/notes', (req, res)=>{
        console.log('execute GET notes request');
    })
}