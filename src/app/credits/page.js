import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function Credits() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8">
      <h1 className="text-center text-4xl mb-4 font-bold text-[#DBAE58]">Credits</h1>
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mb-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-[#D3D3D3]">
            Creators
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[#D3D3D3] mt-0 m-2">
            This project was created by Reagan, Khoa, and Sean. Together, we combined our skills and passion for technology to develop an educational platform that simplifies the process of PC building.
          </p>
        </CardContent>
      </Card>

      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-[#D3D3D3]">
            Special Thanks
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[#D3D3D3] mt-0 m-2">
            We would like to extend our special thanks to our advisor, Jeff Kim, for his invaluable guidance and support throughout the project, helping us refine our ideas and achieve our goals.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

