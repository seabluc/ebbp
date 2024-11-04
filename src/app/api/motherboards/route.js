import connection from '@/lib/db';

export async function GET(request) {
  try {
    const query = `
      SELECT Motherboard.*, Part.*, Motherboard.memoryMax AS motherboardMemoryMax, 
      Motherboard.memoryType AS motherboardMemoryType, 
      Motherboard.socket AS motherboardSocket,
      CAST(Part.price AS DECIMAL(10,2)) AS price,
      GROUP_CONCAT(MotherboardMemorySpeed.memorySpeed) AS supportedSpeeds
      FROM Motherboard
      JOIN Part ON Motherboard.partId = Part.partId
      LEFT JOIN MotherboardMemorySpeed ON Motherboard.motherboardId = MotherboardMemorySpeed.motherboardId
      GROUP BY Motherboard.motherboardId
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