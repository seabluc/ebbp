"use server"
import MotherboardClient from "./MotherboardClient";
import { getMotherboardComponents } from "../serverActions"

export default async function MotherboardPage() {
  // Server Action to retrieve Motherboard parts
  const MotherboardComponents = await getMotherboardComponents();
  return <MotherboardClient initialData={MotherboardComponents} />;
}