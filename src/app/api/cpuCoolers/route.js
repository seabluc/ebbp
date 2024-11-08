import connection from '@/utils/db';

export async function GET(request) {
  try {
    const query = `
      SELECT 
      CpuCooler.*, Part.*, CAST(Part.price AS DECIMAL(10,2)) AS price,
      GROUP_CONCAT(CpuCoolerSocket.socket) AS supportedSockets
      FROM CpuCooler
      JOIN Part ON CpuCooler.partId = Part.partId
      LEFT JOIN CpuCoolerSocket ON CpuCooler.cpuCoolerId = CpuCoolerSocket.cpuCoolerId
      GROUP BY CpuCooler.cpuCoolerId
    `;
    const [rows] = await connection.query(query);

    // Map rows to transform `supportedSockets` to an array
    const coolersWithSockets = rows.map(row => ({
      ...row,
      supportedSockets: row.supportedSockets ? row.supportedSockets.split(',') : [],
    }));

    return new Response(JSON.stringify(coolersWithSockets), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
