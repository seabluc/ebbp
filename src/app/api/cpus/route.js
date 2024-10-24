// this is an API endpoint that sends a request to the location specified by
// the URL (/api/Cpu) and what to specifically request via HTTP method
/*
import connection from '@/lib/db';

export async function GET(request) {
  try {
    const [rows] = await connection.query('SELECT * FROM Cpu');
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
*/

import connection from '@/lib/db';

export async function GET(request) {
  try {
    const query = `
      SELECT Cpu.*, Part.*
      FROM Cpu
      JOIN Part ON Cpu.partId = Part.partId
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

/*
    const query = `
      SELECT Cpu.coreCount, Cpu.performanceCoreClock, Cpu.performanceCoreBoostClock,
      Cpu.socket, Cpu.microarchitecture, Cpu.tdp, Cpu.integrated, Part.name, Part.price
      FROM Cpu
      JOIN Part ON Cpu.partId = Part.partId
    `;
*/