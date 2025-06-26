import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { partItems } from "@/lib/data/part-Items";

export async function generateMetadata() { return { title: 'Products' } };

export default function ProductsPage() {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-12">
      <h1 className="w-full h-14 md:h-16 p-[14px] md:p-4 bg-[#7A8588] text-white text-center text-xl md:text-2xl font-bold shadow-md">
        PC Component Products
      </h1>
      <Carousel className="w-full max-w-xs md:max-w-sm shadow-sm">
        <CarouselContent>
          {partItems.map((part) => (
            <CarouselItem key={part.id}>
              <Card className="h-[512px] md:h-[572px] p-3.5 md:p-4 bg-[#4D585B]">
                <CardHeader className="bg-[#7A8588] text-white rounded-lg shadow-2xl mb-2 md:mb-0 p-6">
                  <CardTitle>{part.type}</CardTitle><Separator className="bg-white" />
                  <CardDescription className="text-white md:text-base">{part.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col aspect-square items-center justify-center gap-6 md:gap-6">
                  <span className="mt-1 md:mt-0 flex items-center justify-center min-w-36 min-h-36 md:min-w-44 md:min-h-44 rounded-lg bg-[#7A8588] p-3 md:p-4 shadow-2xl">
                    <Image src={part.img} alt={`Image of ${part.type} PC Part`} width={128} height={128} className="" />
                  </span>
                  <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base font-semibold shadow-lg" asChild>
                    {part.type === 'Storage' || part.type === 'Memory' ? (
                      <Link href={part.link}>Choose {part.type}</Link>
                    ) : (
                      <Link href={part.link}>Choose a {part.type}</Link>
                    )}
                  </Button>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
