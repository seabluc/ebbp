// import { gridItems } from "@/lib/data/grid-items"; ... maybe rename this to Hero?
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Wrench, PackageSearch, BookOpenText, Handshake, Mail } from "lucide-react";

const HomeGrid = () => {
  return (
    <section id="/" className="w-full flex flex-col items-center">
      <h1 className="max-w-[360px] md:max-w-lg text-center my-5 p-3 md:p-5 md:mt-2 text-xl md:text-3xl font-bold">
        <p>Select. Optimize. Build Smarter.</p>
        <p>Start Building with Confidence.</p>
        <p className="pt-0.5 text-sm md:text-base text-muted-foreground">
          Compatibility checks and guidance for PC builders of all levels.
        </p>
      </h1>
      <div className="md:max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
        <Card className="flex flex-col md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 bg-white transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white]">
          <CardHeader>
            <CardTitle>EBBP</CardTitle>
            <CardDescription>A smarter way to build your PC.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>
              EvenBabiesBuildPCs (EBBP) is a modern PC building tool designed to teach and empower. Unlike traditional part pickers, EBBP encourages learning through experimentation—even if it means selecting incompatible parts. With detailed compatibility status checks and clear feedback, EBBP guides PC builders of all levels toward confident decision-making.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center border-t-1.5 pt-3">
            <p className="text-sm text-muted-foreground">Understand your PC, not just pick parts.</p>
          </CardFooter>
        </Card>

        <Card className="flex flex-col md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-3 bg-white transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white]">
          <CardHeader>
            <CardTitle>WORKSHOP</CardTitle>
            <CardDescription>Where your build comes together.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="border-b-1.5 pb-2 md:pb-4">
              The Workshop is where your build takes shape. Here, you can view and manage every part you've selected in one organized space. EBBP provides summaries of your current build’s progress, including what's missing, what’s compatible, and issues that may need a second look. For those who want deeper insights, a detailed compatibility review breaks everything down—helping you catch issues and make informed adjustments before you finalize your setup.
            </p>
            <div className="mt-4 max-w-[400px] md:max-w-[600px] mx-auto">
              <Image
                src="/workshop-card-img.png"
                alt="Workshop Example Image"
                width={1332}
                height={1332}
                quality={100}
                className="rounded-lg w-full h-auto shadow-xl"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t-1.5 pt-3">
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base font-semibold" asChild>
              <Link href="/workshop"><Wrench />Start your Build</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 bg-white transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white]">
          <CardHeader>
            <CardTitle>PRODUCTS</CardTitle>
            <CardDescription>Browse modern parts, pick what fits.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="border-b-1.5 pb-2 md:pb-4">
              Explore essential PC components across all major categories, including CPU, motherboard, memory, storage, GPU, cooling, and power supply units. EBBP emphasizes modern parts (AM4, LGA1700+) to keep you and your build up-to-date. You're free to select any combination of parts—EBBP doesn’t restrict you to only “compatible” options. Compatibility checks come after, not before, to encourage learning through real decision-making.
            </p>
            <div className="mt-4 max-w-[400px] md:max-w-[600px] mx-auto">
              <Image
                src="/products-card-img.png"
                alt="Workshop Example Image"
                width={1266}
                height={1266}
                quality={100}
                className="rounded-lg w-full h-auto shadow-xl"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t-1.5 pt-3">
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base font-semibold" asChild>
              <Link href="/products"><PackageSearch />Browse PC Parts</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 bg-white transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white]">
          <CardHeader>
            <CardTitle>GUIDES</CardTitle>
            <CardDescription>Simple explanations for every part.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            Our beginner-friendly guides break down each component in plain English. We strip away the jargon so you can focus on understanding the essentials. Whether you're new to PC building or brushing up on specifics, these short reads help you build knowledge fast.
          </CardContent>
          <CardFooter className="flex justify-center border-t-1.5 pt-3">
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base font-semibold" asChild>
              <Link /*href="/guides"*/ href="/guides/cpu"><BookOpenText />Learn the Parts</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col md:col-start-3 md:col-end-4 md:row-start-3 md:row-end-4 bg-white transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white]">
          <CardHeader>
            <CardTitle>CREDITS</CardTitle>
            <CardDescription>A project built with passsion and purpose.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            EBBP is the result of dedicated work by developer sand PC enthuiasts who care deeply about empowering others. We draw inspiration from tools like PCPartPicker, but with a learning-first approach. Special thanks to open-source tools, contributors, and the community that made this possible.
          </CardContent>
          <CardFooter className="flex justify-center border-t-1.5 pt-3">
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base font-semibold" asChild>
              <Link href="/credits"><Handshake />View Credits</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col md:col-start-3 md:col-end-4 md:row-start-4 md:row-end-5 bg-white transition-all duration-300 hover:shadow-[12px_12px_12px_rgba(0,0,0,0.1),_-10px_-10px_10px_white]">
          <CardHeader>
            <CardTitle>CONTACT</CardTitle>
            <CardDescription>React out or report an issue.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            Got a question, idea, or bug to report? We're always open to feedback. Whether you're a fellow dev, curious builder, or just want to say hi, we'd love to hear from you.
          </CardContent>
          <CardFooter className="flex justify-center border-t-1.5 pt-3">
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base font-semibold" asChild>
              <a href="mailto:seanluc.ghim@gmail.com"
                target="_blank"
                aria-label="Email creator">
                <Mail />Email Us
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default HomeGrid;

{/*gridItems.map((item) => (
          <Card key={item.id} className={`${item.className}`}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <Button asChild variant="link">
              <Link href={item.link}>click me</Link>
            </Button>
            <CardContent className="flex-1">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <span>might move item description here
                what is going on with the className though?<br />
                {item.className}</span>
            </CardContent>
            <CardFooter className="flex justify-center border-t-1.5 pt-3">footer</CardFooter>
          </Card>
        ))*/}