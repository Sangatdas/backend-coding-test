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
    if (req.headers.username) {
        let result = await Service.getLastSearchByUser(req.headers.userId, req.query.limit);
        res.status(200).send(result);
    } else {
        let result = await Service.getTopSearch(req.query.limit);
        res.status(200).send(result);
    }
});

app.listen(PORT, () => {
    console.info("Server started on port: ", PORT);
})