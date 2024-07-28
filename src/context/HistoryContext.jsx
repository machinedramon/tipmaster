/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const HistoryContext = createContext(null);

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const value = {
    records,
    loading,
    totalPages,
    page,
    setRecords,
    setLoading,
    setTotalPages,
    setPage,
  };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};
