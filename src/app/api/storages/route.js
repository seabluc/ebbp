import connection from '@/lib/db';

export async function GET(request) {
  try {
    const query = `
      SELECT Storage.*, Part.*, Storage.type AS storageType
      FROM Storage
      JOIN Part ON Storage.partId = Part.partId
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