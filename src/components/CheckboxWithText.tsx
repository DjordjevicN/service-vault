import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxWithText({
  id,
  label,
  description,
}: {
  id: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <Checkbox id={id} />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
}
