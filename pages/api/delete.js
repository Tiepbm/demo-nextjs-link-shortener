import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const method = req.method;
    const { id } = JSON.parse(req.body);
    try {

        const { rows } = await sql`DELETE FROM links WHERE id = ${id} RETURNING *;`

        res.status(200).json(rows);

    } catch(error) {
    }

}