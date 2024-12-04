"use server"

import MemoryClient from "./MemoryClient";
import { getMemoryComponents } from "../serverActions"

export default async function MemoryPage() {
  // Server Action to retrieve Memory parts
  const MemoryComponents = await getMemoryComponents();
  return <MemoryClient initialData={MemoryComponents} />;
}