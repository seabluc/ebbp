import connection from '@/utils/db';

export async function GET(request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit')) || 10; // default limit is 10
  const offset = parseInt(url.searchParams.get('offset')) || 0; // default offset is 0

  try {
    const query = `
      SELECT PowerSupply.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price
      FROM PowerSupply
      JOIN Part ON PowerSupply.partId = Part.partId
      LIMIT ? OFFSET ?
    `;
    const [rows] = await connection.query(query, [limit, offset]);

    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
