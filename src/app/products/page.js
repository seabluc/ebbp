import { Card, CardHeader, CardBody, Divider, Link, Image } from "@nextui-org/react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#4D585B]"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mb-8 text-[#DBAE58]">PC Component Products</h1> {/* Title: Gold */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1650px]">
        {/* CPU Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg"> {/* Thinner Gold Border */}
          <CardHeader className="flex gap-3">
            <Image
              alt="CPU"
              height={50}
              radius="sm"
              src="https://example.com/cpu-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/cpu" className="text-[#DBAE58]">
                CPU
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]"> {/* Card Text: Light Gray */}
            <p>Browse the latest CPUs for your PC build.</p>
          </CardBody>
        </Card>

        {/* Motherboard Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Motherboard"
              height={50}
              radius="sm"
              src="https://example.com/motherboard-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/motherboard" className="text-[#DBAE58]">
                Motherboard
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]">
            <p>Select the right motherboard for your components.</p>
          </CardBody>
        </Card>

        {/* RAM Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="RAM"
              height={50}
              radius="sm"
              src="https://example.com/ram-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/ram" className="text-[#DBAE58]">
                RAM
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]">
            <p>Find the best RAM for your gaming or work needs.</p>
          </CardBody>
        </Card>

        {/* GPU Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="GPU"
              height={50}
              radius="sm"
              src="https://example.com/gpu-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/gpu" className="text-[#DBAE58]">
                GPU
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]">
            <p>Explore powerful GPUs for your PC setup.</p>
          </CardBody>
        </Card>

        {/* Storage Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Storage"
              height={50}
              radius="sm"
              src="https://example.com/storage-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/storage" className="text-[#DBAE58]">
                Storage
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]">
            <p>Check out the latest storage options for your needs.</p>
          </CardBody>
        </Card>

        {/* PSU Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="PSU"
              height={50}
              radius="sm"
              src="https://example.com/psu-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/psu" className="text-[#DBAE58]">
                PSU
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]">
            <p>Find reliable power supplies for your components.</p>
          </CardBody>
        </Card>

        {/* Peripherals Card */}
        <Card className="w-[400px] h-[300px] bg-[#488A99] border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex gap-3">
            <Image
              alt="Peripherals"
              height={50}
              radius="sm"
              src="https://example.com/peripherals-image.jpg"
              width={50}
            />
            <div className="flex flex-col">
              <Link isExternal showAnchorIcon href="/products/peripherals" className="text-[#DBAE58]">
                Peripherals
              </Link>
            </div>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="text-[#E0E0E0]">
            <p>Check out our range of peripherals.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
