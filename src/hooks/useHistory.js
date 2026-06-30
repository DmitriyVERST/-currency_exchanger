import { useEffect, useState } from "react";

const STORAGE_KEY = "history";

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  function addToHistory(item) {
    setHistory((prev) => {
      const isDuplicate = prev.some(
        (entry) =>
          entry.amount === item.amount &&
          entry.from === item.from &&
          entry.to === item.to
      );

      if (isDuplicate) return prev;

      return [...prev, item];
    });
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, addToHistory, clearHistory };
}
