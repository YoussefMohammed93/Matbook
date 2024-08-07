import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Globe } from "lucide-react";

export default function GlobeFn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Globe size={"16px"} className="mt-[2px]" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Public</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
