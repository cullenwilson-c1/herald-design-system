import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// `text-dm-{size}` are font sizes; every other `text-dm-*` is a color.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["dm-xs", "dm-sm", "dm-md", "dm-body", "dm-input", "dm-lg", "dm-xl"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
