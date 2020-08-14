const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

const Service = require('./service');

// Insert search query in DB
app.post("/api/v1/search/", (req, res) => {
    Service.insertSearch(req.body);
    res.sendStatus(204);
});

// Retrieve search query from DB
app.get("/api/v1/search/", async (req, res) => {
    try {
        let result = await Service.getSearch(req.headers.userId, req.query.limit);
        res.status(200).send(result);    
    } catch (err) {
        console.error(err);
        res.status(400);
    }
});

app.listen(PORT, () => {
    console.info("Server started on port: ", PORT);
})