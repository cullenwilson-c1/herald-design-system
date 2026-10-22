/** Shared focus ring: visible only for keyboard focus. */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring focus-visible:outline-solid";

/** Shared enter/exit animation for portaled floating content (tw-animate-css), motion-safe only. */
export const floatingMotion =
  "motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:zoom-in-95 " +
  "motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=closed]:zoom-out-95 " +
  "motion-safe:data-[side=top]:slide-in-from-bottom-2 motion-safe:data-[side=bottom]:slide-in-from-top-2 " +
  "motion-safe:data-[side=left]:slide-in-from-right-2 motion-safe:data-[side=right]:slide-in-from-left-2";

/** Shared surface for menu / select popovers. */
export const floatingSurface =
  "z-50 rounded-dm-lg border border-dm-border bg-dm-surface p-dm-2 font-dm-sans text-dm-text shadow-dm-raised";

/** Shared row styling for menu / select items. */
export const floatingItem =
  "relative flex h-8 w-full cursor-default select-none items-center gap-dm-3 rounded-dm-sm px-dm-3 text-dm-md outline-none " +
  "data-[highlighted]:bg-dm-surface-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
