import { useState, useEffect } from "react";

import CurrencySelect from "../components/CurrencySelect/CurrencySelect";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { cn } from "../utils/cn";

export default function AlertsPage() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [target, setTarget] = useState(0.9);

  const { rate } = useExchangeRate(from, to);

  const [alerts, setAlerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("alerts") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  function addAlert() {
    setAlerts([...alerts, { from, to, target, id: Date.now() }]);
  }

  function removeAlert(id) {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  }

  return (
    <div>
      <PageHeader
        title="Алерты"
        description="Создайте уведомление о достижении целевого курса."
      />

      <div
        className={cn(
          "mb-8 grid gap-4 rounded-xl border border-cream-dark bg-cream/40 p-5 sm:grid-cols-2 lg:grid-cols-4",
          "dark:border-navy-700 dark:bg-navy-950/50"
        )}
      >
        <CurrencySelect label="Из" value={from} onChange={setFrom} id="alert-from" />
        <CurrencySelect label="В" value={to} onChange={setTo} id="alert-to" />

        <div className="space-y-2">
          <label
            htmlFor="target-rate"
            className="block text-sm font-medium text-navy-800 dark:text-slate-200"
          >
            Целевой курс
          </label>
          <input
            id="target-rate"
            type="number"
            value={target}
            step="0.01"
            onChange={(e) => setTarget(Number(e.target.value))}
            className={cn(
              "w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none",
              "focus:border-navy-800 dark:border-navy-700 dark:bg-navy-900 dark:focus:border-slate-400"
            )}
          />
        </div>

        <div className="flex items-end">
          <Button onClick={addAlert} className="w-full">
            Добавить алерт
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-cream-dark px-6 py-12 text-center dark:border-navy-700">
            <p className="text-slate-500 dark:text-slate-400">Алертов пока нет</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const currentRate =
              alert.from === from && alert.to === to ? rate : null;

            let status = "ожидание";

            if (currentRate != null) {
              status =
                currentRate >= alert.target ? "🔥 достигнут" : "📉 ниже цели";
            }

            return (
              <div
                key={alert.id}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border border-cream-dark bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
                  "dark:border-navy-700 dark:bg-navy-900"
                )}
              >
                <span className="font-medium text-navy-900 dark:text-white">
                  {alert.from} → {alert.to}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  цель: {alert.target}
                </span>
                <span className="text-sm">{status}</span>
                <Button variant="secondary" onClick={() => removeAlert(alert.id)}>
                  Удалить
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
