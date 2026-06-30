import { useEffect, useState } from "react";

async function fetchFromOpenErApi(from, signal) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  if (data.result !== "success" || !data.rates) {
    throw new Error("Invalid response");
  }

  return data.rates;
}

async function fetchFromCdn(from, signal) {
  const res = await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`,
    { signal }
  );

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  const baseRates = data[from.toLowerCase()];

  if (!baseRates) {
    throw new Error("Invalid response");
  }

  return Object.fromEntries(
    Object.entries(baseRates).map(([code, value]) => [code.toUpperCase(), value])
  );
}

async function fetchRates(from, signal) {
  try {
    return await fetchFromOpenErApi(from, signal);
  } catch (primaryError) {
    if (primaryError.name === "AbortError") {
      throw primaryError;
    }

    return fetchFromCdn(from, signal);
  }
}

export function useExchangeRate(from, to) {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setRates(null);
    setError(null);
    setLoading(true);

    async function loadRates() {
      try {
        const data = await fetchRates(from, controller.signal);

        if (cancelled) return;

        setRates(data);
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        setRates(null);
        setError("Ошибка загрузки курса");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRates();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [from]);

  const rate = from === to ? 1 : (rates?.[to] ?? null);

  return { rate, loading, error };
}
