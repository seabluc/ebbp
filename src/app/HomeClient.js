"use client"

import { Button, Card, CardHeader, CardBody, Divider, Link } from "@nextui-org/react";

export default function HomeClient() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#4D585B]"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mt-16 mb-4 text-[#DBAE58] text-center">Home Page</h1> {/* Title: Gold */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1650px] mx-auto"> {/* Centering the card grid */}
        {/* First Card */}
        <Card className="w-[450px] h-[300px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
          <CardHeader className="flex items-center justify-center">
            {/*
            <Image
              alt="PC Workshop"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            */}
            <Link isExternal showAnchorIcon href="/workshop" className="text-[#DBAE58] ml-4">
              <h1 className="py-2 text-xl">PC Workshop</h1>
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p className="mb-4 text-center">Explore our PC Workshop to create, customize, and refine your own PC builds. Whether you're new to PC building or a seasoned pro, design your ideal setup with step-by-step guidance and expert tips.</p>
            <Link href="/workshop">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Start Building
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Second Card */}
        <Card className="w-[450px] h-[300px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center justify-center">
            {/*
            <Image
              alt="Products"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            */}
            <Link isExternal showAnchorIcon href="/products" className="text-[#DBAE58] ml-4">
              <h1 className="py-2 text-xl">Products</h1>
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p className="mb-4 text-center">Discover a wide range of high-quality PC components, from powerful GPUs to efficient cooling systems. Browse our selections and make informed choices with detailed specs and user reviews.</p>
            <Link href="/products">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Explore
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Third Card */}
        <Card className="w-[450px] h-[300px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center justify-center">
            {/*
            <Image
              alt="Guides"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            */}
            <Link isExternal showAnchorIcon href="/guides" className="text-[#DBAE58] ml-4">
              <h1 className="py-2 text-xl">Guides</h1>
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p className="mb-4 text-center">Access a collection of guides designed to assist you in your PC building journey. Our resources cover everything from basic components to advanced setups, ensuring you have all the knowledge you need to succeed.</p>
            <Link href="/guides">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2">
                View Guides
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Fourth Card */}
        {/*
        <Card className="w-[450px] h-[300px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="Generate PC"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/generate-pc" className="text-[#DBAE58] ml-4">
              Generate PC
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p className="mb-4 text-center">Use our PC Generator tool to create your custom PC build based on your preferences and budget. Select components tailored to your needs, and let our generator do the hard work of suggesting the best combinations for performance and compatibility.</p>
            <Link href="/generate-pc">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2">
                Generate Now
              </Button>
            </Link>
          </CardBody>
        </Card>
        */}

        {/* Fifth Card */}
        <Card className="w-[450px] h-[300px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center justify-center">
            {/*
            <Image
              alt="Account"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            */}
            <Link isExternal showAnchorIcon href="/account" className="text-[#DBAE58] ml-4">
              <h1 className="py-2 text-xl">Account</h1>
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p className="mb-4 text-center">Manage your account settings and preferences here. Access your profile, view your saved builds, and customize your experience on our platform to make your PC building journey smoother and more enjoyable.</p>
            <Link href="/account">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Manage Account
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Sixth Card: Credits */}
        <Card className="w-[450px] h-[300px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center justify-center">
            {/*
            <Image
              alt="Credits"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            */}
            <Link isExternal showAnchorIcon href="/credits" className="text-[#DBAE58] ml-4">
              <h1 className="py-2 text-xl">Credits</h1>
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p className="mb-4 text-center">Acknowledgments for those who contributed to the development of this project. Special thanks to all collaborators, mentors, and the community for their support and feedback.</p>
            <Link href="/credits">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                View Credits
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>

    </div>
  );
}
