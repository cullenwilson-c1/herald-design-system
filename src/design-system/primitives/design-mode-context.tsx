import * as React from "react";

export interface DesignModeContextValue {
  /** True when the surrounding `.design-mode` root carries the `dark` class. */
  dark: boolean;
  /** Element portaled primitives (Select, DropdownMenu, Tooltip) mount into. Defaults to document.body. */
  portalContainer?: HTMLElement | null;
}

const DesignModeContext = React.createContext<DesignModeContextValue>({ dark: false });

export type DesignModeProviderProps = {
  children?: React.ReactNode;
} & (
  | { value: DesignModeContextValue; dark?: never; portalContainer?: never }
  | ({ value?: undefined } & DesignModeContextValue)
);

/** Accepts either `value={{ dark, portalContainer }}` or `dark` / `portalContainer` props. */
export function DesignModeProvider({ value, dark, portalContainer, children }: DesignModeProviderProps) {
  const resolvedDark = value ? value.dark : dark;
  const resolvedContainer = value ? value.portalContainer : portalContainer;
  const memo = React.useMemo(
    () => ({ dark: resolvedDark, portalContainer: resolvedContainer }),
    [resolvedDark, resolvedContainer],
  );
  return <DesignModeContext.Provider value={memo}>{children}</DesignModeContext.Provider>;
}

export function useDesignMode(): DesignModeContextValue {
  return React.useContext(DesignModeContext);
}
