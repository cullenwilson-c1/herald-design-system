import { Database } from "lucide-react";
import type { Scenario } from "@/design-system/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/design-system/primitives";

const OPTIONS: { value: Scenario; label: string }[] = [
  { value: "realistic", label: "Realistic data" },
  { value: "empty-tenant", label: "Empty tenant" },
  { value: "everything-broken", label: "Error states" },
];

export interface ScenarioSelectProps {
  value: Scenario;
  onValueChange: (value: Scenario) => void;
  disabled?: boolean;
  className?: string;
  /** Portal container for the menu; defaults to the DesignShell root via context. */
  container?: HTMLElement | null;
}

/** Mock-data scenario picker. Neutral address-bar-style pill; identical for every scenario. */
export function ScenarioSelect({ value, onValueChange, disabled, className, container }: ScenarioSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onValueChange(v as Scenario)} disabled={disabled}>
      <SelectTrigger aria-label="Mock data scenario" variant="pill" className={className}>
        <Database aria-hidden className="size-[15px] shrink-0 text-dm-text-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent container={container}>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
