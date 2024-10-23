import { Card, CardHeader, CardBody, Divider, Link, Image, Button } from "@nextui-org/react";

export default function ProductsPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4D585B]"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mb-8 text-[#DBAE58]">PC Component Products</h1> {/* Title: Gold */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1650px]">
        {/* CPU Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="CPU"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/cpu" className="text-[#DBAE58] ml-4">
              CPU
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Browse the latest CPUs for your PC build.</p>
            <Link href="/products/cpu">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop CPUs
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Motherboard Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="Motherboard"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/motherboard" className="text-[#DBAE58] ml-4">
              Motherboard
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Select the right motherboard for your components.</p>
            <Link href="/products/motherboard">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop Motherboards
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* RAM Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="RAM"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/ram" className="text-[#DBAE58] ml-4">
              RAM
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Find the best RAM for your gaming or work needs.</p>
            <Link href="/products/ram">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop RAM
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* GPU Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="GPU"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/gpu" className="text-[#DBAE58] ml-4">
              GPU
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Explore powerful GPUs for your PC setup.</p>
            <Link href="/products/gpu">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop GPUs
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Storage Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="Storage"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/storage" className="text-[#DBAE58] ml-4">
              Storage
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Check out the latest storage options for your needs.</p>
            <Link href="/products/storage">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop Storage
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* PSU Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="PSU"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/psu" className="text-[#DBAE58] ml-4">
              PSU
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Power up your PC with reliable power supply units.</p>
            <Link href="/products/psu">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop PSUs
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Peripherals Card */}
        <Card className="w-[350px] h-[250px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="Peripherals"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/peripherals" className="text-[#DBAE58] ml-4">
              Peripherals
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#E0E0E0]"> {/* Adjusted for flexbox */}
            <p>Discover essential peripherals for your setup.</p>
            <Link href="/products/peripherals">
              <Button className="bg-[#DBAE58] text-[#488A99] hover:bg-[#DBAE58]/80 h-12 w-40 mt-2"> {/* Adjusted height and width */}
                Shop Peripherals
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
