import RouteManager from "./routes/RouteManager";
import { Toaster } from "react-hot-toast";
import { HistoryProvider } from "./context/HistoryContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { RollStatusProvider } from "./context/RollStatusContext";

function App() {
  return (
    <div id="app">
      <RollStatusProvider>
        <HistoryProvider>
          <AnalyticsProvider>
            <RouteManager />
            <Toaster />
          </AnalyticsProvider>
        </HistoryProvider>
      </RollStatusProvider>
    </div>
  );
}

export default App;
