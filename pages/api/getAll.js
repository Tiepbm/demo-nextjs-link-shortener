import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    try {
        const { rows } = await sql`SELECT * FROM links;`
        res.status(200).json(rows);

    } catch(error) {
    }
}