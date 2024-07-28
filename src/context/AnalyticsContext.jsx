/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// context/AnalyticsContext.js

import { createContext, useContext, useState } from "react";

const AnalyticsContext = createContext(null);

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const value = {
    analyticsData,
    loadingAnalytics,
    setAnalyticsData,
    setLoadingAnalytics,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
