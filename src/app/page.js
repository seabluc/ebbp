import { Card, CardHeader, CardBody, Divider, Link, Image } from "@nextui-org/react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4D585B]"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mb-8 text-[#DBAE58]">Home Page</h1> {/* Title: Gold */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1650px]">
        {/* First Card */}
        <Card className="w-[550px] h-[350px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
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
          <CardBody className="text-[#E0E0E0]"> {/* Text: Light Gray */}
            <p>PC Workshop text</p>
          </CardBody>
        </Card>

        {/* Second Card */}
        <Card className="w-[550px] h-[350px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
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
          <CardBody className="text-[#E0E0E0]">
            <p>Products text</p>
          </CardBody>
        </Card>

        {/* Third Card */}
        <Card className="w-[550px] h-[350px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
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
          <CardBody className="text-[#E0E0E0]">
            <p>Guides text</p>
          </CardBody>
        </Card>

        {/* Fourth Card */}
        <Card className="w-[550px] h-[350px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
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
          <CardBody className="text-[#E0E0E0]">
            <p>Glossary text</p>
          </CardBody>
        </Card>

        {/* Fifth Card */}
        <Card className="w-[550px] h-[350px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
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
          <CardBody className="text-[#E0E0E0]">
            <p>Generate PC text</p>
          </CardBody>
        </Card>

        {/* Sixth Card */}
        <Card className="w-[550px] h-[350px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
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
          <CardBody className="text-[#E0E0E0]">
            <p>Account text</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
