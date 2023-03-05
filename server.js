var fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res)=>{
    try {
        res.send(JSON.parse(fs.readFileSync('./Develop/db/db.json')))
    } catch {
        console.log('there has been an error!');
        res.sendStatus(500);
    }
});

app.post('/api/notes', (req, res)=>{
    let notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'))
    notes.push({
        "id": uuidv4(),
        "title": req.body.title,
        "text": req.body.text
    })
    fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (err)=>{
        if(err){
            console.log('there has been an error!');
            res.sendStatus(500);
        }
    })
    res.sendStatus(200);
});



app.listen(PORT, () => console.log(`app running on port ${PORT} 🥸`))