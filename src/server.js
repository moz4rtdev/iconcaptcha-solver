import express from 'express';
import 'dotenv';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const iconcaptcha = require("../index.node");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
    res.status(200).send("OK");
});

app.post("/api", (req, res) => {
    let bs64 = req.get("img");
    //console.log(bs64);
    //console.log(req);

    let result = iconcaptcha.solve(bs64);
    res.status(200).send(result);


})

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
});