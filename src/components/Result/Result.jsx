import { cn } from "../../utils/cn";

function formatAmount(value, currency) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(value);
}

export default function Result({ value, from, to, rate, loading, error }) {
  if (error) {
    return (
      <div
        className={cn(
          "rounded-xl border border-usa-red/30 bg-usa-red/5 px-5 py-4 text-usa-red",
          "dark:border-usa-red-light/40 dark:text-usa-red-light"
        )}
      >
        <p className="font-medium">Ошибка: {error}</p>
      </div>
    );
  }

  if (loading && rate == null) {
    return (
      <div className="rounded-xl border border-cream-dark bg-cream px-5 py-4 dark:border-navy-700 dark:bg-navy-950">
        <p className="text-slate-600 dark:text-slate-400">Загрузка курса...</p>
      </div>
    );
  }

  if (rate == null) {
    return (
      <div className="rounded-xl border border-cream-dark bg-cream px-5 py-4 dark:border-navy-700 dark:bg-navy-950">
        <p className="text-slate-600 dark:text-slate-400">Курс недоступен</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-navy-800/10 bg-gradient-to-br from-white to-cream px-6 py-5 dark:border-navy-700 dark:from-navy-800 dark:to-navy-950">
      <p className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Результат
      </p>
      <p className="mt-2 font-serif text-4xl font-semibold text-navy-900 dark:text-white">
        {formatAmount(value, to)}{" "}
        <span className="text-2xl text-usa-red dark:text-usa-red-light">{to}</span>
      </p>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        1 {from} = {formatAmount(rate, to)} {to}
      </p>
    </div>
  );
}
