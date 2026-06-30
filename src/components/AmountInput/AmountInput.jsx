import { cn } from "../../utils/cn";

export default function AmountInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="amount"
        className="block text-sm font-medium text-navy-800 dark:text-slate-200"
      >
        Сумма
      </label>
      <input
        id="amount"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите сумму"
        className={cn(
          "w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-lg text-navy-900 outline-none transition-colors",
          "placeholder:text-slate-400 focus:border-navy-800 focus:bg-white",
          "dark:border-navy-700 dark:bg-navy-950 dark:text-white dark:focus:border-slate-400 dark:focus:bg-navy-800"
        )}
      />
    </div>
  );
}
