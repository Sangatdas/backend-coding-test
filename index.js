const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

const Service = require('./service');

app.post("/api/v1/search/", (req, res) => {
    Service.insertSearch(req.body);
    res.sendStatus(200);
});

app.get("/api/v1/search/", async (req, res) => {
    if (req.query.username) {
        let search = await Service.getLastSearchByUser(req.query);
        res.status(200).send(search);
    } else {
        let search = await Service.getTopSearch(req.query);
        res.status(200).send(search);
    }
});

app.listen(PORT, () => {
    console.info("Server started on port: ", PORT);
})