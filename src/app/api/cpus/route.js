import connection from '@/utils/db';
// import db from '@/../server/models'; attempt on connecting to db w/ Sequelize via mysql2

export async function GET(request) {
  //const url = new URL(request.url);
  //const limit = parseInt(url.searchParams.get('limit')) || 10; // default limit is 10
  //const offset = parseInt(url.searchParams.get('offset')) || 0; // default offset is 0

  try {
    /*
    const query = `
    SELECT Cpu.*, Cpu.memoryMax AS cpuMemoryMax, Part.*, 
    Cpu.socket AS cpuSocket, CAST(Part.price AS DECIMAL(10,2)) AS price
    FROM Cpu
    JOIN Part ON Cpu.partId = Part.partId
    LIMIT ? OFFSET ?
  `;
  */
    const query = `
      SELECT Cpu.*, Cpu.memoryMax AS cpuMemoryMax, Part.*, 
      Cpu.socket AS cpuSocket, CAST(Part.price AS DECIMAL(10,2)) AS price
      FROM Cpu
      JOIN Part ON Cpu.partId = Part.partId
    `;
    const [rows] = await connection.query(query/*, [limit, offset]*/);

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