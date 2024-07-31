// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { query } from "@/lib/db";

export default function handler(req, res) {
  res.status(200).json({ text: "hello" });
}

/*
// req comes from another page ...
export default async function handler(req, res) {
  // If its GET, then run a query in SQL
  if (req.method === "GET") {
     
    // In SQL, select data from database
    const products = await query({
      query:"SELECT * FROM processor",
      values:[]
    });

  }
  res.status(200).json({ name: "John Doe" });
}
*/