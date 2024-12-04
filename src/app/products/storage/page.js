"use server"

import StorageClient from "./StorageClient";
import { getStorageComponents } from "../serverActions"

export default async function StoragePage() {
  // Server Action to retrieve Storage parts
  const storageComponents = await getStorageComponents();
  return <StorageClient initialData={storageComponents} />;
}