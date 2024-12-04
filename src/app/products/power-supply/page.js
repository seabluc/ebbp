"use server"
import PowerSupplyClient from "./PowerSupplyClient";
import { getPowerSupplyComponents } from "../serverActions"

export default async function PowerSupplyPage() {
  // Server Action to retrieve PowerSupply parts
  const PowerSupplyComponents = await getPowerSupplyComponents();
  return <PowerSupplyClient initialData={PowerSupplyComponents} />;
}