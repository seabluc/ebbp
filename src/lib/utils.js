import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// helper function that dynamically merges Tailwind classes, used across all ShadCN components (necessary for shadcn to work properly)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
