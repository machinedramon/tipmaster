/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "../context/HistoryContext"; // Importa o hook do contexto
import { useRollStatus } from "../context/RollStatusContext"; // Importa o hook do contexto
import { Typography, TextField, Box, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import toast from "react-hot-toast";
import { ChartRollStatus } from "./ChartRollStatus";

export const ContentMenu = () => {
  const { setLoading, setRecords, setTotalPages, page, setPage, totalPages } =
    useHistory();
  const { gameData } = useRollStatus();

  // Função para obter a data de hoje no formato YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Função para obter a data de amanhã no formato YYYY-MM-DD
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const fetchHistory = async (currentPage = page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/history`, {
        params: {
          startDate: `${startDate}T00:00:00.000Z`,
          endDate: `${endDate}T23:59:59.999Z`,
          page: currentPage,
        },
      });
      setRecords(response.data.records);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  useEffect(() => {
    if (startDate <= endDate) {
      setPage(1);
      fetchHistory(1); // Reset page to 1 and fetch data when start or end date changes
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (gameData && gameData.status === "complete") {
      fetchHistory(page);
    }
  }, [gameData]);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate > tomorrow) {
      toast.error("Start date cannot be in the future.");
    } else if (newStartDate > endDate) {
      toast.error("Start date cannot be later than end date.");
    } else {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate > tomorrow) {
      toast.error("End date cannot be in the future.");
    } else if (newEndDate < startDate) {
      toast.error("End date cannot be earlier than start date.");
    } else {
      setEndDate(newEndDate);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#1A242D",
        height: "20%",
        padding: "0 24px",
      }}
    >
      <ChartRollStatus />
      <TextField
        size="small"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{ style: { color: "#ABAFB7" } }}
        InputProps={{ style: { color: "#ABAFB7" } }}
        sx={{
          width: "16ch",
          backgroundColor: "#0F1923",
          color: "#fff",
          borderRadius: 1,
          svg: { color: "#fff" },
        }}
      />
      <TextField
        size="small"
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        InputLabelProps={{ style: { color: "#ABAFB7" } }}
        InputProps={{ style: { color: "#ABAFB7" } }}
        sx={{ width: "16ch", backgroundColor: "#0F1923", borderRadius: 1 }}
      />
      <Typography sx={{ color: "#ABAFB7", whiteSpace: "nowrap" }}>
        Page: {page} of {totalPages}
      </Typography>
      <IconButton
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        sx={{ color: "#ABAFB7" }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        sx={{ color: "#ABAFB7" }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};
