"use server"

import CpuCoolerClient from "./CpuCoolerClient";
import { getCpuCoolerComponents } from "../serverActions"

export default async function CpuCoolerPage() {
  // Server Action to retrieve CpuCooler parts
  const CpuCoolerComponents = await getCpuCoolerComponents();
  return <CpuCoolerClient initialData={CpuCoolerComponents} />;
}