import { Country } from "country-state-city";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export const CountrySelect = ({
  value,
  onSelect,
}: {
  onSelect: (countryCode: string) => void;
  value?: string;
}) => {
  const countries = Country.getAllCountries();

  return (
    <div className="space-y-1 relative z-50">
      <Label htmlFor="country">Country</Label>
      <Select
        value={value}
        onValueChange={(val) => {
          onSelect(val);
        }}
      >
        <SelectTrigger id="country" className="w-full!">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {countries.map((c) => (
            <SelectItem key={c.isoCode} value={c.isoCode}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
