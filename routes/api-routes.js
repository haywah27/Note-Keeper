const fs = require('fs');

module.exports = function (app) {
    app.get("/api/notes", function (req, res){
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            notesData = JSON.parse(data);
            res.send(notesData);
        });
    });

    app.post("/api/notes", function (req, res){
        const notesOB = req.body;

        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            notesData = JSON.parse(data);
            notesData.push(notesOB);
            let noteNum = 0;
            notesData.forEach((note) => {
                note.id = noteNum;
                noteNum++;
                return notesData;
            });
            
            noteStringify = JSON.stringify(notesData);

            fs.writeFile("./db/db.json", noteStringify, (err, data) => {
                if (err) throw err;
            });
            
        });
        res.send("Note taken.");

    });
}