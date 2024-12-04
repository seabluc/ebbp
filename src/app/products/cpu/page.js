"use server"

import CpuClient from "./CpuClient";
import { getCpuComponents } from "../serverActions"

export default async function CpuPage() {
  // Server Action to retrieve CPU parts
  const cpuComponents = await getCpuComponents();
  return <CpuClient initialData={cpuComponents} />;
}