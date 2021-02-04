var noteData = require("../db/db.json");
const fs = require('fs');

module.exports = function (app) {
    app.get("/api/notes", function (req, res){
        fs.readFile('db/db.json', (err, data)=> {
            if (err) throw err;
            notesData = JSON.parse(data)
            res.send(notesData);
        })
    });

    app.post("/api/notes", function (req, res){
       
        notesData = JSON.parse(data)
        noteData.push(req.body);
        res.json(true);
    });
}