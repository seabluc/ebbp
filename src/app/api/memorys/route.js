import connection from '@/utils/db';

export async function GET(request) {
  try {
    const query = `
      SELECT Memory.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price
      FROM Memory
      JOIN Part ON Memory.partId = Part.partId
      WHERE Memory.formFactor IN ('288-pin DIMM (DDR4)', '288-pin DIMM (DDR5)')
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