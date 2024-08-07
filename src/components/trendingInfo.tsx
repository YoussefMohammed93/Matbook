import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function TrendingInfo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info />
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is updated every 3 hours</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
