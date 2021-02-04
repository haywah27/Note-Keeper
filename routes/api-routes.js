// require read/ write file package
const fs = require('fs');

module.exports = function (app) {
    // when in this domain, read values from db file
    app.get("/api/notes", (req, res) => {
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

    // save new notes to db file
    app.post("/api/notes", (req, res) => {
        // set variable to key-value pairs from page
        let notesOB = req.body;

        // read db file
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            // set variable to the object value described by string 
            notesData = JSON.parse(data);
            // push data into object array
            notesData.push(notesOB);

            // set unique ID
            let noteNum = 1;
            // for each item in array, add an id that correlates with the index position
            notesData.forEach((entry) => {
                entry.id = noteNum;
                noteNum = noteNum + 1;
                return notesData;
            });
            
            // turn into string for fs to write new file
            noteStringify = JSON.stringify(notesData);

            // update db file with new information
            fs.writeFile("./db/db.json", noteStringify, (err, data) => {
                if (err) throw err;
            });

        });
        // send the data to the api/notes page
        res.send("Note taken.");

    });

    // delete notes
    app.delete('/api/notes/:id', function (req, res) {

        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            // using the path /api/notes/:id, the "id" from the URL path can be read using req.params.id
            let delNote = req.params.id;

            // set variable to the object value described by string 
            notesData = JSON.parse(data);
            
            for (let i = 0; i < notesData.length; i++) {
                // turn delNote to readable number using parseFloat
                if (notesData[i].id === parseFloat(delNote)) {
                    notesData.splice([i], 1);
                }
              }
            // stringify new content
            noteStringify = JSON.stringify(notesData);

            // update db file with new content
            fs.writeFile("./db/db.json", noteStringify, (err, data) => {
                if (err) throw err;
            });
        });
        // send new information to api/notes
        res.send('Deleted note');
      });
};