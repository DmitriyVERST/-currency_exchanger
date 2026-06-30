export async function getHistoricalRates(from, to) {
  const res = await fetch(
    `https://open.er-api.com/v6/latest/${from}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rates");
  }

  const data = await res.json();

  const baseRate = data.rates[to];

  const result = Array.from({ length: 30 }, (_, i) => {
    const variation = (Math.random() - 0.5) * 0.02;

    return {
      date: `Day ${i + 1}`,
      rate: +(baseRate + variation * i).toFixed(4),
    };
  });

  return result;
}