'use client'

import { Button } from '@/components/ui/button'
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useBuildStore from '@/lib/useBuildStore'
import { Wattage } from '@/lib/build-summary/build-summary'
import { CompatibilityStatus } from './compatibility-status'
import { Save, Trash2, History } from 'lucide-react'

const WorkshopDashboard = () => {
  const { clearBuild } = useBuildStore()

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={250}>
      <div className="border-t-2 border-x-2 md:border-none flex flex-col w-full max-w-7xl bg-slate-100 mx-4 md:mx-0 rounded-lg shadow-xl ring-1 ring-black/5">
        {/* Top: Build name and buttons */}
        <div className="flex flex-col md:flex-row rounded-t-lg items-center gap-2 p-3.5 md:p-4">
          <input
            type="text"
            placeholder="Enter Build Name"
            className="w-full text-center bg-default-300 border rounded-lg p-2"
          />
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  // onClick={saveBuild}
                  className="bg-default-300 font-semibold text-base px-3 py-2 md:px-4 md:py-2.5 rounded-lg hover:bg-green-500/90 focus:ring-2 text-black border-black/15 border-1">
                  <div className="flex justify-center items-center gap-1 md:gap-1.5">
                    {/* {  <Image src={SaveIcon} alt="save PC build" width={19} height={19} />} */}
                    <Save size={20} className="min-w-5 min-h-5" />
                    Save
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="hidden md:block">
                <p className="">Save all PC parts into your named build</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={clearBuild}
                  className="bg-default-300 font-semibold text-base px-3 py-2 md:px-4 md:py-2.5 rounded-lg hover:bg-red-500/90 focus:ring-2 text-black border-black/15 border-1">
                  <div className="flex justify-center items-center gap-1 md:gap-1.5">
                    <Trash2 size={20} className="min-w-5 min-h-5" />
                    Clear
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="hidden md:block">
                <p className="">Deselct all PC parts in current build</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  // onClick={history}
                  className="bg-default-300 font-semibold text-base px-3 py-2 md:px-4 md:py-2.5 rounded-lg hover:bg-default-300/55 focus:ring-2 text-black border-black/15 border-1">
                  <div className="flex justify-center items-center gap-1 md:gap-1.5">
                    <History size={20} className="min-w-5 min-h-5" />
                    History
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="hidden md:block">
                <p className="">View PC part selection/compatibility status history [COMING SOON]</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Bottom: Compatibility and Wattage */}
        <div className="flex flex-col md:flex-row w-full font-semibold text-sm pt-2 md:pt-0">
          <div className="w-full md:w-[82.5%] overflow-hidden md:rounded-bl-lg">
            <CompatibilityStatus />
          </div>
          <div className="w-full md:w-[17.5%] bg-[#DBAE58] md:hover:bg-[#E0BA68] transition-colors duration-300 ease-in-out overflow-hidden rounded-b-lg md:rounded-b-none md:rounded-br-lg">
            <Wattage />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default WorkshopDashboard;