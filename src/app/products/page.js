import { Card, CardHeader, CardBody, Divider, Link, Image, Button } from "@nextui-org/react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#4D585B]"> {/* Background: Charcoal */}
      <h1 className="text-4xl font-bold mt-16 mb-4 text-[#DBAE58] text-center">PC Component Products</h1> {/* Title: Gold */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1650px]">
        {/* CPU Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
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
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Browse the latest CPUs for your PC build.</p>
            <Link href="/products/cpu">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose a CPU
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Motherboard Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
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
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Select the right motherboard for your components.</p>
            <Link href="/products/motherboard">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose a Motherboard
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Memory Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
          <CardHeader className="flex items-center">
            <Image
              alt="Memory"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/memory" className="text-[#DBAE58] ml-4">
              Memory
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Find the best RAM for your gaming or work needs.</p>
            <Link href="/products/memory">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose Memory
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Storage Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
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
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Check out the latest storage options for your needs.</p>
            <Link href="/products/storage">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose Storage
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Video Card Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
          <CardHeader className="flex items-center">
            <Image
              alt="Video Card"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/video-card" className="text-[#DBAE58] ml-4">
              Video Card
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Explore powerful video cards for your PC setup.</p>
            <Link href="/products/video-card">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose a Video Card
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* CPU Cooler Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
          <CardHeader className="flex items-center">
            <Image
              alt="CPU Cooler"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/cpu-cooler" className="text-[#DBAE58] ml-4">
              CPU Cooler
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Browse the latest CPUs for your PC build.</p>
            <Link href="/products/cpu-cooler">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose a CPU Cooler
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* PSU Card */}
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> {/* Background: Gray 500 */}
          <CardHeader className="flex items-center">
            <Image
              alt="PSU"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/power-supply" className="text-[#DBAE58] ml-4">
              PSU
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]"> {/* Text: Light Gray */}
            <p>Power your PC with a reliable power supply unit.</p>
            <Link href="/products/power-supply">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2"> {/* Darker black text color */}
                Choose a PSU
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Case Card */}
        {/*
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg">
          <CardHeader className="flex items-center">
            <Image
              alt="case"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/" className="text-[#DBAE58] ml-4">
              Case
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p>Provide adeqate enclosure for your PC components.</p>
            <Link href="/products/case">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2">
                Choose a Case
              </Button>
            </Link>
          </CardBody>
        </Card>
        */}
        {/* Monitor Card */}
        {/*
        <Card className="w-[350px] h-[250px] bg-gray-500 border-2 border-[#DBAE58] rounded-lg"> 
          <CardHeader className="flex items-center">
            <Image
              alt="monitor"
              height={50}
              width={50}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            />
            <Link isExternal showAnchorIcon href="/products/monitor" className="text-[#DBAE58] ml-4">
              Monitor
            </Link>
          </CardHeader>
          <Divider className="border-[#DBAE58]" />
          <CardBody className="flex flex-col justify-between items-center text-[#D3D3D3]">
            <p>Display graphical output.</p>
            <Link href="/products/monitor">
              <Button className="bg-[#C8A15D] text-[#4B4B4B] hover:bg-[#C8A15D]/80 h-12 w-41 mt-2">
                Choose a Monitor
              </Button>
            </Link>
          </CardBody>
        </Card>
        */}
      </div>
    </div>
  );
}
