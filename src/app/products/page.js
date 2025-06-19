// import { Card, CardHeader, CardContent, Divider, Link, Image, Button } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  return {
    title: 'Products',
  };
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8 text-[#DBAE58] text-center">PC Component Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1650px]">
        {/* CPU Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Link href="/products/cpu" className="text-[#DBAE58]">
              CPU
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <Image
              alt="CPU"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <p className="text-center pb-1.5">Browse the latest CPUs for your PC build.</p>
            <Link href="/products/cpu">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose a CPU
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Motherboard Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Link href="/products/motherboard" className="text-[#DBAE58]">
              Motherboard
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2"> {/* Text: Light Gray */}
            <Image
              alt="Motherboard"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <p className="text-center pb-1.5">Select the right motherboard for your components.</p>
            <Link href="/products/motherboard">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41"> {/* Darker black text color */}
                Choose a Motherboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Memory Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
          <CardHeader className="flex items-center">
            <Link href="/products/memory" className="text-[#DBAE58]">
              Memory
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <Image
              alt="Memory"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <p className="text-center pb-1.5">Find the best RAM for your gaming or work needs.</p>
            <Link href="/products/memory">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose Memory
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Storage Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Link href="/products/storage" className="text-[#DBAE58]">
              Storage
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2"> {/* Text: Light Gray */}
            <p className="text-center pb-1.5">Check out the latest storage options for your needs.</p>
            <Image
              alt="Storage"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <Link href="/products/storage">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41"> {/* Darker black text color */}
                Choose Storage
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Video Card Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Link href="/products/video-card" className="text-[#DBAE58]">
              Video Card
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <Image
              alt="Video Card"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <p className="text-center pb-1.5">Explore powerful video cards for your PC setup.</p>
            <Link href="/products/video-card">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose a Video Card
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* CPU Cooler Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Link href="/products/cpu-cooler" className="text-[#DBAE58]">
              CPU Cooler
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <Image
              alt="CPU Cooler"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <p className="text-center pb-1.5">Browse the latest CPUs for your PC build.</p>
            <Link href="/products/cpu-cooler">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose a CPU Cooler
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* PSU Card */}
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Link href="/products/power-supply" className="text-[#DBAE58]">
              PSU
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <Image
              alt="PSU"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <p className="text-center pb-1.5">Power your PC with a reliable power supply unit.</p>
            <Link href="/products/power-supply">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose a PSU
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* <Link href={`/products/${productId}`}>Product {productId}</Link> */}

        {/* Case Card */}
        {/*
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="case"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <Link href="/" className="text-[#DBAE58]">
              Case
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <p className="text-center pb-1.5">Provide adeqate enclosure for your PC components.</p>
            <Link href="/products/case">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose a Case
              </Button>
            </Link>
          </CardContent>
        </Card>
        */}
        {/* Monitor Card */}
        {/*
        <Card className="flex flex-col items-center justify-center w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> 
          <CardHeader className="flex items-center">
            <Image
              alt="monitor"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="pb-2"
            />
            <Link href="/products/monitor" className="text-[#DBAE58]">
              Monitor
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center text-[#D3D3D3] gap-2">
            <p className="text-center pb-1.5">Display graphical output.</p>
            <Link href="/products/monitor">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41">
                Choose a Monitor
              </Button>
            </Link>
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  );
}
