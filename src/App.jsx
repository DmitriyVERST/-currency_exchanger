import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import { useConverter } from "./hooks/useConverter";
import { useHistory } from "./hooks/useHistory";

import AlertsPage from "./pages/AlertsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ConverterPage from "./pages/ConverterPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const converter = useConverter();
  const { history, addToHistory, clearHistory } = useHistory();

  function handleSaveToHistory() {
    addToHistory({
      amount: converter.amount,
      from: converter.from,
      to: converter.to,
      result: converter.result,
    });
  }

  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <ConverterPage
              {...converter}
              handleSaveToHistory={handleSaveToHistory}
            />
          }
        />
        <Route
          path="/history"
          element={<HistoryPage history={history} clearHistory={clearHistory} />}
        />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
