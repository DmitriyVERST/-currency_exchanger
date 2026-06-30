import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import PageHeader from "../components/ui/PageHeader";
import { useHistoricalRates } from "../hooks/useHistoricalRates";
import { cn } from "../utils/cn";

export default function AnalyticsPage() {
  const { data, loading, error } = useHistoricalRates("USD", "EUR");

  const summary = [
    { currency: "EUR", value: data.at(-1)?.rate },
    { currency: "GBP", value: data.at(-1)?.rate * 0.85 },
    { currency: "JPY", value: data.at(-1)?.rate * 150 },
  ];

  return (
    <div>
      <PageHeader
        title="Аналитика"
        description="Динамика курса USD → EUR за последние периоды."
      />

      {loading && (
        <p className="text-slate-600 dark:text-slate-400">Загрузка...</p>
      )}

      {error && (
        <div className="rounded-xl border border-usa-red/30 bg-usa-red/5 px-5 py-4 text-usa-red dark:text-usa-red-light">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-8">
          <div className="h-80 w-full rounded-xl border border-cream-dark bg-white p-4 dark:border-navy-700 dark:bg-navy-950 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#b31942"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {summary.map((item) => {
              const isUp = item.value >= data[0]?.rate;

              return (
                <div
                  key={item.currency}
                  className={cn(
                    "rounded-xl border border-cream-dark bg-cream/40 px-5 py-4",
                    "dark:border-navy-700 dark:bg-navy-950/50"
                  )}
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.currency}
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold text-navy-900 dark:text-white">
                    {item.value?.toFixed(2)}{" "}
                    <span className="text-base">{isUp ? "📈" : "📉"}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
