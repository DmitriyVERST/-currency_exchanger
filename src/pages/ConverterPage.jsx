import AmountInput from "../components/AmountInput/AmountInput";
import CurrencySelect from "../components/CurrencySelect/CurrencySelect";
import Result from "../components/Result/Result";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { WELCOME } from "../constants/siteContent";
import { cn } from "../utils/cn";

export default function ConverterPage({
  amount,
  setAmount,
  from,
  setFrom,
  to,
  setTo,
  handleSwap,
  result,
  rate,
  loading,
  error,
  handleSaveToHistory,
}) {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-cream-dark bg-cream/60 p-6 dark:border-navy-700 dark:bg-navy-950/50 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-usa-red dark:text-usa-red-light">
          {WELCOME.title}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 dark:text-white sm:text-4xl">
          Конвертер валют
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {WELCOME.description}
        </p>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-navy-800 dark:text-slate-200">
            {WELCOME.techTitle}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WELCOME.technologies.map((tech) => (
              <li
                key={tech.name}
                className="rounded-xl border border-cream-dark bg-white px-4 py-3 dark:border-navy-700 dark:bg-navy-900"
              >
                <p className="font-medium text-navy-900 dark:text-white">{tech.name}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {tech.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <PageHeader
          title="Обмен"
          description="Введите сумму и выберите валюты. Курс обновляется автоматически."
        />

        <div className="space-y-6">
          <AmountInput value={amount} onChange={setAmount} />

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
            <CurrencySelect label="Из" value={from} onChange={setFrom} id="from" />

            <button
              type="button"
              onClick={handleSwap}
              aria-label="Поменять валюты местами"
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border text-lg transition-colors",
                "border-cream-dark bg-white text-navy-800 hover:border-navy-800 hover:bg-cream",
                "dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:hover:border-slate-400"
              )}
            >
              ⇄
            </button>

            <CurrencySelect label="В" value={to} onChange={setTo} id="to" />
          </div>

          <Result
            value={result}
            from={from}
            to={to}
            rate={rate}
            loading={loading}
            error={error}
          />

          <Button onClick={handleSaveToHistory}>Сохранить в историю</Button>
        </div>
      </section>
    </div>
  );
}
