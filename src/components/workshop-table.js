'use client';

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter, //might not need this
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WorkshopRow from "@/components/workshop-row";
import WorkshopCard from "@/components/workshop-card";
import useBuildStore from "@/lib/useBuildStore";

const WorkshopTable = () => {
  const { cpu, motherboard, memory, storage, videoCard,
    cpuCooler, powerSupply } = useBuildStore();
  //React.useEffect(() => { useBuildStore.persist.rehydrate(); }, []);
  return (
    <div className="w-full md:max-w-7xl md:py-2 md:border-2 rounded-md md:border-gray-200 md:dark:border-gray-200/50">
      {/* ===================== Desktop View (Table) ===================== */}
      <div className="hidden md:block">
        <Table>
          <TableCaption className="border-t-2 md:pt-2 md:pb-1 px-2 text-start text-xs md:text-sm font-medium md:border-gray-200 md:dark:border-gray-200/50">* Prices are not displayed as they cannot be directly purchased from EBBP</TableCaption>
          <TableHeader className="border-b-1.5 md:border-gray-200 md:dark:border-gray-200/50">
            <TableRow>
              <TableHead className="p-1 md:p-2 text-sm border-b">Component</TableHead>
              <TableHead className="p-2 border-b">Selection</TableHead>
              <TableHead className="p-0 border-b">Status</TableHead>
              <TableHead className="p-0 border-b"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <WorkshopRow
              label="CPU"
              component={cpu}
            />
            <WorkshopRow
              label="Motherboard"
              component={motherboard}
            />
            {memory.length > 0 ? (
              memory.map((module, idx) => (
                <React.Fragment key={`memory-${idx}`}>
                  <WorkshopRow
                    label="Memory"
                    component={module}
                    index={idx}
                  />
                  {idx === memory.length - 1 && (
                    <WorkshopRow
                      label="Memory"
                      component={{}}
                      isAdditional
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <WorkshopRow label="Memory" component={{}} />
            )}
            {storage.length > 0 ? (
              storage.map((device, idx) => (
                <React.Fragment key={`storage-${idx}`}>
                  <WorkshopRow
                    label="Storage"
                    component={device}
                    index={idx}
                  />
                  {idx === storage.length - 1 && (
                    <WorkshopRow
                      label="Storage"
                      component={{}}
                      isAdditional
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <WorkshopRow label="Storage" component={{}} />
            )}
            <WorkshopRow
              label="Video Card"
              component={videoCard}
            />
            <WorkshopRow
              label="CPU Cooler"
              component={cpuCooler}
            />
            <WorkshopRow
              label="Power Supply"
              component={powerSupply}
            />
          </TableBody>
          {/*<TableFooter className="flex gap-2">
          <TableRow></TableRow>
        </TableFooter>*/}
        </Table>
      </div>

      {/* ====================== Mobile View (Cards) ====================== */}
      <div className="block md:hidden">
        <WorkshopCard label="CPU" component={cpu} />
        <WorkshopCard label="Motherboard" component={motherboard} />
        {memory.length > 0 ? (
          memory.map((module, idx) => (
            <React.Fragment key={`memory-${idx}`}>
              <WorkshopCard
                label="Memory"
                component={module}
                index={idx}
              />
              {idx === memory.length - 1 && (
                <WorkshopCard
                  label="Memory"
                  component={{}}
                  isAdditional
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <WorkshopCard label="Memory" component={{}} />
        )}
        {storage.length > 0 ? (
          storage.map((device, idx) => (
            <React.Fragment key={`storage-${idx}`}>
              <WorkshopCard
                label="Storage"
                component={device}
                index={idx}
              />
              {idx === storage.length - 1 && (
                <WorkshopCard
                  label="Storage"
                  component={{}}
                  isAdditional
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <WorkshopCard label="Storage" component={{}} />
        )}
        <WorkshopCard label="Video Card" component={videoCard} />
        <WorkshopCard label="CPU Cooler" component={cpuCooler} />
        <WorkshopCard label="Power Supply" component={powerSupply} />
        <div className="pt-4 px-4 text-center text-xs font-medium text-muted-foreground">
          * Prices are not displayed as they cannot be directly purchased from EBBP
        </div>
      </div>
    </div>
  )
}

export default WorkshopTable;