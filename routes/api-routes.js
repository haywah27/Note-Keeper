var noteData = require("../db/db.json");

module.exports = function (app) {
    app.get("/api/notes", function (req, res){
        fs.readFile('db/db.json', (err, data)=> {
            if (err) throw err;
            res.json(JSON.parse(data));
        })
    });

    app.post("/api/notes", function (req, res){
        noteData.push(req.body);
        res.json(true);
    });
}