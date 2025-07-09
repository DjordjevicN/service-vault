import { X } from "lucide-react";
import { Country } from "country-state-city";
import { CountrySelect } from "./CountrySelect";

const CalendarCountryFilter = ({
  selectedCountries,
  onCountryChange,
  onCountryRemove,
}: {
  selectedCountries: string[];
  onCountryChange: (country: string) => void;
  onCountryRemove: (country: string) => void;
}) => {
  const addCountryToFilter = (country: string) => {
    onCountryChange(country);
  };

  const removeFilterCountry = (country: string) => {
    onCountryRemove(country);
  };
  const maxCountries = selectedCountries.length >= 10;
  return (
    <div className="flex items-end gap-2 p-2">
      <div className="min-w-80">
        <CountrySelect
          disabled={maxCountries}
          onSelect={(country) => addCountryToFilter(country)}
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {selectedCountries.map((country) => {
          const name = Country.getCountryByCode(country);
          return (
            <div
              key={country}
              className="border bg-accent flex items-center gap-3 rounded px-2 py-1"
            >
              <p className="text-xs">{name?.name || country}</p>
              <div
                className="cursor-pointer"
                onClick={() => removeFilterCountry(country)}
              >
                <X className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCountryFilter;
