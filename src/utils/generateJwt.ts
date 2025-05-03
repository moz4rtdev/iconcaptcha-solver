import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET as string;

export async function generateJwt(): Promise<string> {
  return jwt.sign({ time: Date.now() }, key, { expiresIn: 5 * 60 });
}
