import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { formatCurrency } from "../utils/formatCurrency";
import { cn } from "../utils/cn";

export default function HistoryPage({ history, clearHistory }) {
  return (
    <div>
      <PageHeader
        title="История"
        description="Сохранённые конвертации из текущей сессии и прошлых посещений."
      >
        <Button variant="danger" onClick={clearHistory}>
          Очистить историю
        </Button>
      </PageHeader>

      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cream-dark px-6 py-12 text-center dark:border-navy-700">
          <p className="text-slate-500 dark:text-slate-400">История пуста</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {history.map((item, index) => (
            <li
              key={`${item.from}-${item.to}-${item.amount}-${index}`}
              className={cn(
                "flex flex-col gap-1 rounded-xl border border-cream-dark bg-cream/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
                "dark:border-navy-700 dark:bg-navy-950/50"
              )}
            >
              <span className="font-medium text-navy-900 dark:text-white">
                {item.amount} {item.from} → {item.to}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {formatCurrency(item.result, item.to)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
