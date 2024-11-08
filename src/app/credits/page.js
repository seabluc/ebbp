"use client";

import { Card } from "@nextui-org/react";
//import { useSharedData } from "@/context/SharedDataContext";
export default function App() {
  //const { savedBuild } = useSharedData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#4D585B] p-8"> {/* Background: Charcoal */}
      <h1 className="text-center text-4xl mt-8 mb-4 font-bold text-[#DBAE58]">Credits</h1> {/* Title: Gold */}

      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mb-4"> {/* Background: Gray 500 */}
        <h2 className="text-2xl font-semibold mb-2 text-[#D3D3D3]">Creators</h2> {/* Title: Light Gray */}
        <p className="text-[#D3D3D3]">
          This project was created by Reagan, Khoa, and Sean. Together, we combined our skills and passion for technology to develop an educational platform that simplifies the process of PC building.
        </p>
      </Card>

      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
        <h2 className="text-2xl font-semibold mb-2 text-[#D3D3D3]">Special Thanks</h2> {/* Title: Light Gray */}
        <p className="text-[#D3D3D3]">
          We would like to extend our special thanks to our advisor, Jeff Kim, for his invaluable guidance and support throughout the project, helping us refine our ideas and achieve our goals.
        </p>
      </Card>
      {/*
      <div className="flex flex-col">
        {savedBuild.map((component, index) => (
          <div key={index}>
            <p>{component.name}</p>
            <p>{component.type}</p>
          </div>
        ))}
      </div>
          */}
    </div>
  );
}

