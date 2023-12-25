import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const method = req.method;
    const { alias, target } = JSON.parse(req.body);

    try {

        const { rows } = await sql`INSERT INTO links (alias, target) VALUES (${alias}, ${target}) RETURNING *;`

        res.status(200).json(rows);

    } catch(error) {
        console.error(error);
    }

}