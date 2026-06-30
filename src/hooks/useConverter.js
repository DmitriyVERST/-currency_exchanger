import { useState } from "react";

import { useExchangeRate } from "./useExchangeRate";

export function useConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const { rate, loading, error } = useExchangeRate(from, to);

  const numericAmount = Number(amount);
  const result =
    rate != null && amount !== "" && !Number.isNaN(numericAmount)
      ? numericAmount * rate
      : 0;

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  return {
    amount,
    setAmount,
    from,
    setFrom,
    to,
    setTo,
    rate,
    loading,
    error,
    result,
    handleSwap,
  };
}
