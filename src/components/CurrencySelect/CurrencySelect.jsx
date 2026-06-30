import { CURRENCIES } from "../../constants/currencies";
import { cn } from "../../utils/cn";

export default function CurrencySelect({ value, onChange, label, id }) {
  const selectId = id ?? `currency-${label}`;

  return (
    <div className="min-w-0 flex-1 space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-navy-800 dark:text-slate-200"
      >
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-navy-900 outline-none transition-colors",
          "focus:border-navy-800 focus:bg-white",
          "dark:border-navy-700 dark:bg-navy-950 dark:text-white dark:focus:border-slate-400 dark:focus:bg-navy-800"
        )}
      >
        {CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
