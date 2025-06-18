'use client'

import useBuildStore from '@/lib/useBuildStore';
import { useEffect } from 'react';
import { HelpCircle, CircleX, CircleAlert, CircleCheck } from 'lucide-react';
import {
  COMPATIBILITY_STATUS as STATUS,
  BuildTests
} from '@/lib/build-summary';

export const CompatibilityStatus = () => {
  useEffect(() => { useBuildStore.persist.rehydrate(); }, []);

  // Compute fresh each render without mutating anything
  const derivedStatus = {
    graphics: BuildTests.graphics(),
    socket: BuildTests.socket(),
    cooling: BuildTests.cooling(),
    memory: BuildTests.memory(),
    storage: BuildTests.storage(),
    power: BuildTests.power(),
  };

  const hasIncompatibility = Object.values(derivedStatus).some((val) => val === STATUS.INCOMPATIBLE);
  const hasIssue = Object.values(derivedStatus).some((val) => val === STATUS.ISSUE);
  const isCompatible = (!hasIncompatibility && !hasIssue) && Object.values(derivedStatus).some((val) => val === STATUS.COMPATIBLE);
  const isDefault = !Object.values(derivedStatus).some((val) =>
    [STATUS.COMPATIBLE, STATUS.INCOMPATIBLE, STATUS.ISSUE].includes(val)
  );

  let statusBlock = null;

  const content = (bg, Icon, notes) => (
    <div className={`${bg} px-4 py-2 md:px-6 md:py-3`}>
      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
        <span className="text-base text-black flex items-center gap-2">
          <Icon size={19} className="min-w-[19px] min-h-[19px]" /> Compatibility Status:
        </span>
        <span className="text-xs md:text-sm text-gray-800 underline break-words">
          {notes}
        </span>
      </div>

    </div>
  );


  if (hasIncompatibility) {
    statusBlock = content("bg-red-500/95 hover:bg-red-500/70", CircleX, "Incompatibility found! See Build Audit for more details.");
  } else if (hasIssue) {
    statusBlock = content("bg-yellow-500/75 hover:bg-yellow-500/50", CircleAlert, "Issue found! See Build Audit for more details.");
  } else if (isCompatible) {
    statusBlock = content("bg-green-500/85 hover:bg-green-500/60", CircleCheck, "No issues or incompatibilities detected.");
  } else if (isDefault) {
    statusBlock = content("bg-default-400 hover:bg-default-400/95", HelpCircle, "Select a PC Part to get started");
  }

  return <>{statusBlock}</>;
};