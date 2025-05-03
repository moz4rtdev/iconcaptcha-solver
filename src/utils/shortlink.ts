import { generateJwt } from "./generateJwt";

export async function generateShortLink(): Promise<string> {
  const token = await generateJwt();
  const response = await fetch(
    `https://shrinkme.io/api?api=7035dc831d636d8cfe8498783ee431cd1ce680a9&url=https://dev-generator-key.vercel.app/api/iconcaptcha?token=${token}&format=text`,
  );

  const data = await response.text();
  return data;
}
