import { error, type RequestEvent } from '@sveltejs/kit';
import QRCode from 'qrcode';
import * as fs from 'fs/promises';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
  const body = await request.json()

  if (!body?.message) {
    return error(400, 'Invalid request')
  }

  const filePath = `files/${Date.now()}.png`;
  await fs.writeFile(filePath, '\n')
  await QRCode.toFile(filePath, body.message,
    {
      type: 'png',
      width: 400,
      errorCorrectionLevel: 'H'
    }
  );

  const buffer = await fs.readFile(filePath)
  setTimeout(() => {
    fs.unlink(filePath).then(() => {
      console.log(`file ${filePath} deleted`)
    })
  }, 60000)
  return new Response(buffer, {
    headers: { 'content-type': 'image/png' }
  });
}