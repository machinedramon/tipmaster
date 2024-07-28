/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { useAnalytics } from "../context/AnalyticsContext"; // Importa o hook do contexto
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const ChartMenu = () => {
  const { setLoadingAnalytics, setAnalyticsData } = useAnalytics();
  const [numRounds, setNumRounds] = useState(3000);

  const fetchHistoryAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/api/history_analytics",
        {
          params: { n: numRounds },
        }
      );
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    fetchHistoryAnalytics();
  }, [numRounds]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 2,
        backgroundColor: "#1A242D",
      }}
    >
      <FormControl
        sx={{ minWidth: 120, backgroundColor: "#0F1923", borderRadius: 1 }}
      >
        <InputLabel sx={{ color: "#ABAFB7" }}>Rounds</InputLabel>
        <Select
          size="small"
          value={numRounds}
          onChange={(e) => setNumRounds(e.target.value)}
          sx={{ color: "#ABAFB7" }}
        >
          {[25, 50, 100, 500, 1000, 3000].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
