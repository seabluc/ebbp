// confirm with GPT, but is this technically writing the response on the serverend? 
// so an API endpoint is just writing the response you expect from the server instead of.. no wait
// theres an HTTP method which is the end user's request. responses should only have the json body and a status code.
// so why is there a status code in the catch statement..? 
import connection from '@/lib/db';

export async function GET(request) {
  try {
    const [rows] = await connection.query(
      'SELECT processor_id, manufacturer, lineup, model, suffix, base_clock, boost_clock FROM processor'
    );
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
