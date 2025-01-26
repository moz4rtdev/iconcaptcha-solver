import express from 'express';
import 'dotenv/config';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const iconcaptcha = require("../index.node");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send("OK");
});

app.post("/", (req, res) => {
    let bs64 = req.get("img");
    let result = iconcaptcha.solve(bs64);
    res.status(200).send(result);
})

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
});