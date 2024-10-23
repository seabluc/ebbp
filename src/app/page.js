import { Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider, Link, Image } from "@nextui-org/react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4D585B]"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mb-8 text-[#DBAE58]">Home Page</h1> {/* Title: Gold */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1650px]">
        {/* First Card */}
        <Card className="w-[450px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={50}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/workshop" className="text-[#DBAE58]">
                PC Workshop
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0] flex flex-col items-center"> {/* Centered content */}
            <p className="mb-4 text-center">Dive into our PC Workshop, where you can create, customize, and perfect your own PC builds. Whether you're just starting or are an experienced builder, we provide detailed guidance and expert tips to help you design your dream setup with confidence and creativity.</p>
            <Link href="/workshop"> {/* Wrap the button with Link */}
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 w-[120px]" size="sm" auto>
                Start Building
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Second Card */}
        <Card className="w-[450px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="React logo"
              height={50}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products" className="text-[#DBAE58]">
                Products
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0] flex flex-col items-center">
            <p className="mb-4 text-center">Explore our Products section to discover a wide range of high-quality PC components. From powerful GPUs to efficient cooling systems, find everything you need to enhance your build. Browse our curated selections and make informed choices with detailed specifications and user reviews.</p>
            <Link href="/products"> {/* Wrap the button with Link */}
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 w-[120px]" size="sm" auto>
                Explore
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Third Card */}
        <Card className="w-[450px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Vue logo"
              height={50}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/guides" className="text-[#DBAE58]">
                Guides
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0] flex flex-col items-center">
            <p className="mb-4 text-center">Dive into our Guides section, where you'll find comprehensive tutorials and articles designed to help you navigate the world of PC building. Whether you’re a beginner or looking to optimize your setup, our expert advice and detailed walkthroughs will empower you to achieve your goals.</p>
            <Link href="/guides"> {/* Wrap the button with Link */}
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 w-[120px]" size="sm" auto>
                Read More
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Fourth Card */}
        <Card className="w-[450px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Svelte logo"
              height={50}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/glossary" className="text-[#DBAE58]">
                Glossary
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0] flex flex-col items-center">
            <p className="mb-4 text-center">Visit our Glossary for a handy reference to common PC building terms and jargon. Whether you're looking to understand specific components or industry terminology, our easy-to-navigate glossary will help you familiarize yourself with the language of PC building.</p>
            <Link href="/glossary"> {/* Wrap the button with Link */}
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 w-[120px]" size="sm" auto>
                Learn More
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Fifth Card */}
        <Card className="w-[450px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Svelte logo"
              height={50}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/generate" className="text-[#DBAE58]">
                Generate PC
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0] flex flex-col items-center">
            <p className="mb-4 text-center">Use our Generate PC feature to automate your PC building process. Input your preferences and budget, and let our tool recommend the best components for your ideal setup. Save time and ensure compatibility with our intelligent generation system that takes the guesswork out of building.</p>
            <Link href="/generate"> {/* Wrap the button with Link */}
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 w-[120px]" size="sm" auto>
                Generate Now
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Sixth Card */}
        <Card className="w-[450px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Svelte logo"
              height={50}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/account/login" className="text-[#DBAE58]">
                Account
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0] flex flex-col items-center">
            <p className="mb-4 text-center">Access your Account to manage your personal information and track your PC builds. Keep a record of your projects, saved components, and custom builds. Stay connected and receive personalized recommendations based on your interests and past activity.</p>
            <Link href="/account/login"> {/* Wrap the button with Link */}
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 w-[120px]" size="sm" auto>
                Sign In
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
