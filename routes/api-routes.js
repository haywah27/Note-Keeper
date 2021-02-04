// require read/ write file package
const fs = require('fs');

module.exports = function (app) {
    // when in this domain, display raw values from db file
    app.get("/api/notes", function (req, res){
        // read the db file
        fs.readFile('./db/db.json', (err, data) => {
            // throw error if doesnt work
            if (err) throw err;
            // set variable to the object value described by string
            notesData = JSON.parse(data);
            // send the data to the api/notes page
            res.send(notesData);
        });
    });


    app.post("/api/notes", function (req, res){
        // set variable to key-value pairs from page
        const notesOB = req.body;

        // read db file
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            // set variable to the object value described by string 
            notesData = JSON.parse(data);
            // push data into object array
            notesData.push(notesOB);

            // set unique ID
            let noteNum = 0;
            // for each item in array, add an id that correlates with the index position
            notesData.forEach((note) => {
                note.id = noteNum;
                noteNum++;
                return notesData;
            });
            
            // stringify object array
            noteStringify = JSON.stringify(notesData);

            // update db file with new information
            fs.writeFile("./db/db.json", noteStringify, (err, data) => {
                if (err) throw err;
            });

        });
        // send the data to the api/notes page
        res.send("Note taken.");

    });


    app.delete('/api/notes/:id', function (req, res) {

        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            notesData = JSON.parse(data);
            
            res.send(notesData);
        });
        
        noteStringify = JSON.stringify(notesData);

        fs.writeFile("./db/db.json", noteStringify, (err, data) => {
            if (err) throw err;
        });

        res.send('Deleted note');
      });
}