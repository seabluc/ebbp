import CreditsClient from "./CreditsClient";
import { getAllCpus } from "@/controllers/cpuController";

// Nextjs doesn't cache or build this page statically
// Dynamic rendering since this page is accessing dynamic data
export const dynamic = "force-dynamic";

export default async function Credits() {
  const cpus = await getAllCpus();
  //console.log(typeof cpus);
  return (
    <div>
      <CreditsClient params={cpus} />
    </div>
  );
};

