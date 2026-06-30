import { useEffect, useState } from "react";
import { getHistoricalRates } from "../services/historicalRateService";

export function useHistoricalRates(from, to) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!from || !to) return;

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await getHistoricalRates(
          from,
          to,
          controller.signal
        );

        setData(result);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError("Ошибка загрузки графика");
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [from, to]);

  return { data, loading, error };
}