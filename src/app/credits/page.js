import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArrowUpToLine } from "lucide-react";
import Link from "next/link";

export default function Credits() {
  return (
    <div id="" className="flex flex-col items-center gap-6 md:gap-12">
      <header className="page-header">
        <h1>Project Team & Special Thanks</h1>
      </header>
      <div className="flex flex-col md:flex-row gap-6 md:gap-60">
        <Card className="size-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mb-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-[#D3D3D3]">
              Creators
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#D3D3D3] text-lg mt-0 m-2">
              This project was created by Reagan, Khoa, and Sean. Together, we combined our skills and passion for technology to develop an educational platform that simplifies the process of PC building.
            </p>
          </CardContent>
        </Card>

        <Card className="size-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mb-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-[#D3D3D3]">
              Special Thanks
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#D3D3D3] text-lg mt-0 m-2">
              We would like to extend our special thanks to our advisor, Jeff Kim, for his invaluable guidance and support throughout the project, helping us refine our ideas and achieve our goals.
            </p>
          </CardContent>
        </Card>
      </div>
      {/* <div role="navigation" aria-label="Scroll to top"
        className="w-full flex justify-center pb-4 md:pb-1 text-muted-foreground">
        <Link href="#">
          <span className="text-gray-500 dark:text-gray-300 block transform transition duration-250 ease-in-out hover:scale-110 hover:-translate-y-1.5">
            <ArrowUpToLine />
          </span>
        </Link>
      </div> */}
    </div>
  );
};

