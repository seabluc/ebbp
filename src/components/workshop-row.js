import { useMemo, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import useBuildStore from "@/lib/useBuildStore";
import {
  COMPATIBILITY_STATUS as STATUS,
  BuildTests,
  BuildStatus
} from '@/lib/build-summary'
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

export default function WorkshopRow({ label, component, index, isAdditional/*, background = ''*/ }) {
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
    if (!component?.part) return { background: '', icon: '❔' };

    const tests = compatibilityMap[label]?.tests;
    const results = tests.map((test) => BuildTests[test]());
    const hasIncompatibility = results.some((val) => val === STATUS.INCOMPATIBLE);
    const hasIssue = results.some((val) => val === STATUS.ISSUE);
    const isCompatible = (!hasIncompatibility && !hasIssue) &&
      results.some((val) => val === STATUS.COMPATIBLE);

    if (hasIncompatibility) {
      return { background: 'bg-red-500/65 hover:bg-red-500/30 transform transition-colors duration-300 ease-in-out', icon: '❌' }
    };
    if (hasIssue) {
      return { background: 'bg-yellow-500/55 hover:bg-yellow-500/30 transform transition-colors duration-300 ease-in-out', icon: '⚠️' }
    };
    if (isCompatible) {
      return { background: 'bg-green-500/60 hover:bg-green-500/35 transform transition-colors duration-300 ease-in-out', icon: '✔️' }
    };

    return { background: '', icon: '❔' };

    /* Counter for incompatibilities and/or issues. Implement w/ Tooltip SOON
    const issueCount = results.filter((val) => val === STATUS.ISSUE).length;
    const incompatibleCount = results.filter((val) => val === STATUS.INCOMPATIBLE).length;
    const compatibleCount = results.filter((val) => val === STATUS.COMPATIBLE).length;
    const totalProblemCount = incompatibleCount + issueCount;
    if (totalProblemCount > 0) {
      const icon = incompatibleCount > 0 ? '❌' : '⚠️';
      const background = incompatibleCount > 0
        ? 'bg-red-500/65 hover:bg-red-500/30'
        : 'bg-yellow-500/55 hover:bg-yellow-500/20';
      return {
        background,
        icon: `${icon}x${totalProblemCount}`,
        ariaLabel: incompatibleCount > 0
          ? `Incompatible (${totalProblemCount} issue${totalProblemCount > 1 ? 's' : ''})`
          : `Issue (${totalProblemCount} warning${totalProblemCount > 1 ? 's' : ''})`
      };
    }
    if (compatibleCount > 0) {
      return {
        background: 'bg-green-500/55 hover:bg-green-500/20',
        icon: '✔️',
        ariaLabel: 'Compatible'
      };
    }
    return { background: '', icon: '❔', ariaLabel: null }; */
  }, [cpu, motherboard, memory, storage, videoCard, cpuCooler, powerSupply]);

  const { background, icon/*, ariaLabel*/ } = compatibilityStatus;

  const [loading, setLoading] = useState(true);

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
      <TableRow className={`${background} md:h-20 h-12 border-y-1.5 border-black/25 dark:border-white/50`}>
        <TableCell className="p-0">
          <Link
            href={`/products/${label.toLowerCase().replace(/ /g, '-')}`}
            className={buttonVariants({ variant: "link" })}>
            {label}
          </Link>
        </TableCell>
        <TableCell className="p-2">
          <Link href={`/products/${label.toLowerCase().replace(/ /g, '-')}`}>
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base shadow-md">
              <span className="flex items-center gap-2 font-semibold"><CirclePlus /> Add Additional {label}</span>
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className={`${background} md:h-20 h-12 border-y-1.5 border-black/25 dark:border-white/50`}>
      <TableCell className="p-0">
        <Link
          href={`/products/${label.toLowerCase().replace(/ /g, '-')}`}
          className={`${buttonVariants({ variant: "link" })}`}>
          <span className="text-base font-semibold">{label}</span>
        </Link>
      </TableCell>
      <TableCell className="p-2">
        {component.part ? (
          <span className="flex flex-row items-center gap-2">
            <span>
              {/* Maybe wrap Image in a Suspense? */}
              {loading && <Skeleton className="size-[70px] rounded-xl" />}
              <Image
                src={component?.part?.image}
                alt={label}
                width={70}
                height={70}
                loading="lazy"
                onLoad={() => setLoading(false)}
                className={`border-2 border-black/25 dark:border-white/50 rounded-xl object-contain
                  ${loading ? "opacity-0" : "opacity-100"}`}
              // className="border-2 border-black/25 dark:border-white/50 rounded-xl object-contain"
              />
              {/* interesting.. instead of Skeleton appearing the entire row is instead showing the <Link> component below 
              it does not know that component.part exists... look into this. */}
            </span>
            <span className="text-base font-medium">{productName}</span>
          </span>
        ) : (
          <Link href={`/products/${label.toLowerCase().replace(/ /g, '-')}`} className="">
            <Button className="border-1 border-black/25 dark:border-white/50 p-4 mt-1 md:p-5 md:mt-2 bg-[#DBAE58] hover:bg-[#E4C577] text-black text-base shadow-md">
              <span className="flex items-center gap-2 font-semibold"><CirclePlus /> Choose a {label}</span>
            </Button>
          </Link>
        )}
      </TableCell>
      <TableCell className="p-2">
        {icon && (
          <span className="text-[20px] block transform transition-transform duration-250 ease-in-out hover:scale-110" /*title={ariaLabel}*/>
            {icon}
          </span>
        )}
      </TableCell>
      <TableCell className="p-2">
        <button className="block text-[20px] transform transition-transform duration-250 ease-in-out hover:scale-110"
          onClick={() => {
            handleRemove();
            //toast(`${label} removed from build`);
          }}>
          🗑️
        </button>
      </TableCell>
    </TableRow>
  )
}