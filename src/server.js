import { PrismaClient } from '@prisma/client';
import { authSolve, authCreateToken, authDeleteToken, authUpdateToken } from './middlewares.js';
import express from 'express';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const iconcaptcha = require("../index.node");
const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const limiter = rateLimit({
    windowMs: 1000,
    limit: 20
});

app.use(limiter);
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("link");
});

app.get("/admin/tokens", async (req, res) => {
    const tokens = await prisma.tokens.findMany();
    res.status(200).send(tokens);
});

app.get("/v1/token/:id", async (req, res) => {
    const token = req.params.id;
    const query = await prisma.tokens.findUnique({
        where: { id: token }
    })
    res.status(200).json(query);
});

app.post("/v1/token/create", async (req, res) => {
    const body = req.body;
    const newToken = await prisma.tokens.create({
        data: {
            email: body.email,
            credits: 5,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        }
    });
    res.status(200).json(newToken);
});

app.put("/v1/token/update/:id", async (req, res) => {
    const body = req.body;
    const token = await prisma.tokens.update({
        where: { id: body.token },
        data: {
            credits: {
                increment: 5
            }
        }
    });
    res.status(200).send(token);
})

app.post("/v1/solve", authSolve, async (req, res) => {
    let body = req.body;
    let result = iconcaptcha.solve(body.image);
    if (result.success) {
        delete result.success;
        const token = await prisma.tokens.update({
            where: { id: body.token },
            data: {
                credits: {
                    decrement: 1
                }
            }
        });
        res.status(200).json(result);
    } else {
        delete result.success;
        res.status(422).json(result);
    }

})

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
});