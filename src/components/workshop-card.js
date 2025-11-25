import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CirclePlus, ListTodo, X } from "lucide-react";
import useBuildStore from "@/lib/useBuildStore";
import {
  COMPATIBILITY_STATUS as STATUS,
  BuildTests,
  BuildStatus
} from '@/lib/build-summary';

const WorkshopCard = ({ label, component, index, isAdditional }) => {
  const { cpu, motherboard, memory, storage,
    videoCard, cpuCooler, powerSupply,
    removeCpu, removeMotherboard, removeMemory, removeStorage,
    removeVideoCard, removeCpuCooler, removePowerSupply } = useBuildStore();

  const compatibilityMap = {
    CPU: {
      tests: ['graphics', 'socket', 'cooling', 'power']
    },
    Motherboard: {
      tests: ['socket', 'cooling', 'memory', 'storage', 'power']
    },
    Memory: {
      tests: ['socket', 'memory', 'power', /*'cpu'*/]
    },
    Storage: {
      tests: ['socket', 'storage', 'power']
    },
    'Video Card': {
      tests: ['graphics', 'power']
    },
    'CPU Cooler': {
      tests: ['socket', 'cooling', 'power']
    },
    'Power Supply': {
      tests: ['power']
    }
  };

  const compatibilityStatus = useMemo(() => {
    if (!component?.part) return { background: '', /*icon: '❔'*/ };

    const tests = compatibilityMap[label]?.tests;
    const results = tests.map((test) => BuildTests[test]());
    const hasIncompatibility = results.some((val) => val === STATUS.INCOMPATIBLE);
    const hasIssue = results.some((val) => val === STATUS.ISSUE);
    const isCompatible = (!hasIncompatibility && !hasIssue) &&
      results.some((val) => val === STATUS.COMPATIBLE);

    if (hasIncompatibility) {
      return { background: 'bg-red-500/65 md:hover:bg-red-500/30 transform transition-colors duration-300 ease-in-out'/*, icon: '❌'*/ }
    };
    if (hasIssue) {
      return { background: 'bg-yellow-500/55 md:hover:bg-yellow-500/30 transform transition-colors duration-300 ease-in-out'/*, icon: '⚠️'*/ }
    };
    if (isCompatible) {
      return { background: 'bg-green-500/60 md:hover:bg-green-500/35 transform transition-colors duration-300 ease-in-out'/*, icon: '✔️'*/ }
    };

    return { background: '', /*icon: '❔'*/ };
  }, [cpu, motherboard, memory, storage, videoCard, cpuCooler, powerSupply]);

  const { background, /*icon, ariaLabel*/ } = compatibilityStatus;

  // Fix productName later... refer to columns files
  const productName = component?.part?.name
  //?.replace(/Processor|Solid State Drive|Internal Hard Drive/g, "")
  // ?.replace(`(${component?.part?.partNum})`, '')
  // ?.replace(component?.part?.type, '')
  // ?.replace('Processor', '')
  // ?.replace('Solid State Drive', 'SSD')
  // ?.replace('Internal Hard Drive', "HDD")

  // remove a specific PC part from build
  const handleRemove = () => {
    switch (label) {
      case 'CPU':
        removeCpu();
        break;
      case 'Motherboard':
        removeMotherboard();
        break;
      case 'Memory':
        removeMemory(index);
        break;
      case 'Storage':
        removeStorage(index);
        break;
      case 'Video Card':
        removeVideoCard();
        break;
      case 'CPU Cooler':
        removeCpuCooler();
        break;
      case 'Power Supply':
        removePowerSupply();
        break;
    }
  };

  if (isAdditional) {
    return (
      <Card className="border-t-1 border-x-0 border-black/25 dark:border-white/50 shadow-lg">
        <CardHeader className="py-1.5 pl-1">
          <CardTitle>
            <div className="flex items-center justify-between">
              <Link href={`/products/${label.toLowerCase().replace(/ /g, '-')}`}
                className={`${buttonVariants({ variant: "link" })}`}>
                <span className="ml-4 text-xl font-semibold">{label}</span>
              </Link>
              <Link href="#audit">
                <span className="border-x-1.5 border-y-1 border-black/50 rounded-xl p-1">{/*icon*/}</span>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className={`${background} border-black/15 dark:border-white/30 border-0.5 pt-2 pl-5`}>
          <Link href={`/products/${label.toLowerCase().replace(/ /g, '-')}`}>
            <Button className="px-2 bg-[#DBAE58] md:hover:bg-[#E4C577] shadow-md font-semibold text-base text-black border-black/25 dark:border-white/50 border-1">
              <div className="flex items-center gap-2"><CirclePlus /> Add Additional {label}</div>
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-t-1 border-x-0 border-black/25 dark:border-white/50 shadow-lg">
      <CardHeader className="py-1.5 pl-1">
        <CardTitle className="flex items-center justify-between pt-1">
          <Link href={`/products/${label.toLowerCase().replace(/ /g, '-')}`}
            className={`${buttonVariants({ variant: "link" })}`}>
            <span className="ml-4 text-xl font-semibold">{label}</span>
          </Link>
          <Link href="#audit">
            <span className="border-x-1.5 border-y-1 border-black/50 dark:border-white/50 rounded-xl p-1">{/*icon*/}</span>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className={`${background} border-black/15 dark:border-white/30 border-0.5 pt-2 pl-5`}>
        {component.part ? (
          <div className="flex flex-row items-center gap-4">
            <Image
              src={component?.part?.image}
              alt={label}
              width={60}
              height={60}
              loading="lazy"
              className="border-2 border-black/25 dark:border-white/50 rounded-xl object-contain" />
            <span className="text-base font-semibold">{productName}</span>
          </div>
        ) : (
          <Link href={`/products/${label.toLowerCase().replace(/ /g, '-')}`} className="">
            <Button className="px-2 bg-[#DBAE58] md:hover:bg-[#E4C577] shadow-md font-semibold text-base text-black border-black/25 dark:border-white/50 border-1">
              <div className="flex items-center gap-2"><CirclePlus />Choose a {label}</div>
            </Button>
          </Link>
        )}
      </CardContent>
      {component.part && (
        <CardFooter className="flex items-center justify-evenly py-4">
          <Link href="#audit">
            <Button className="bg-gray-300 font-semibold text-base px-6 py-3 rounded-lg text-black border-black/25 dark:border-white/50 border-1">
              <div className="flex justify-center items-center gap-2">
                <ListTodo />Audit
              </div>
            </Button>
          </Link>
          <Button className="bg-gray-300 font-semibold text-base px-6 py-3 rounded-lg text-black border-black/25 dark:border-white/50 border-1"
            onClick={handleRemove}>
            <div className="flex justify-center items-center gap-2">
              <X />Remove
            </div>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}


export default WorkshopCard;