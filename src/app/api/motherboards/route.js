import connection from '@/lib/db';

export async function GET(request) {
  try {
    const query = `
      SELECT Motherboard.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price
      FROM Motherboard
      JOIN Part ON Motherboard.partId = Part.partId
    `;
    const [rows] = await connection.query(query);
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