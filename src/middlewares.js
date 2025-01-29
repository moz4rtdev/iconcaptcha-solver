import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function authCreateToken(req, res, next) {
    next();
}

export async function authUpdateToken(req, res, next) {
    next();
}

export async function authDeleteToken(req, res, next) {
    const id = req.get('id');
    const del = await prisma.tokens.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        }
    });
    res.status(200).send(del);
}

export async function authSolve(req, res, next) {
    const body = req.body;
    if (!body.token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided.' });
    }

    if (!body.image) {
        return res.status(401).json({ error: 'Unauthorized: No image provided.' });
    }

    const token = await prisma.tokens.findUnique({
        where: {
            id: body.token
        }
    });

    if (token == null) {
        return res.status(404).json({ error: 'invalid or expired key' });
    }

    if (token.credits <= 0) {
        return res.status(401).json({ error: 'Unauthorized: your credits are gone' });
    }

    next();
}