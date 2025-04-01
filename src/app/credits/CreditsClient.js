"use client";

import { Card } from "@nextui-org/react";

export default function CreditsClient({ params }) {
  //const components = params;
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#4D585B] p-8"> {/* Background: Charcoal */}
      <h1 className="text-center text-4xl mb-4 font-bold text-[#DBAE58]">Credits</h1> {/* Title: Gold */}
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg mb-4"> {/* Background: Gray 500 */}
        <h2 className="text-2xl font-semibold mt-1.5 ml-2 text-[#D3D3D3]">Creators</h2> {/* Title: Light Gray */}
        <p className="text-[#D3D3D3] mt-1 ml-2 mb-2 mr-2">
          This project was created by Reagan, Khoa, and Sean. Together, we combined our skills and passion for technology to develop an educational platform that simplifies the process of PC building.
        </p>
      </Card>
      <Card className="w-[350px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
        <h2 className="text-2xl font-semibold mt-1.5 ml-2 text-[#D3D3D3]">Special Thanks</h2> {/* Title: Light Gray */}
        <p className="text-[#D3D3D3] mt-1 ml-2 mb-2 mr-2">
          We would like to extend our special thanks to our advisor, Jeff Kim, for his invaluable guidance and support throughout the project, helping us refine our ideas and achieve our goals.
        </p>
      </Card>
      <div className="">
        {params.map((model) => (
          <div key={model.cpuId}>
            Cpu's primary key: {model.cpuId} Cpu's foreign key: {model.partId} Cpu's microarchitecture: {model.microarchitecture} Part's name: {model.Part?.name}
          </div>
        ))}
      </div>
    </div>
  );
}

{/*<div key={model.testId}>Test's primary key: {model.testId} Test's firstName: {model.firstName}</div>*/ }
{/*<div key={model.userId}>User's primary key: {model.userId} User's foreign key: {model.testId} User's username: {model.username} Test prop's email: {model.Test?.email}</div>*/ }