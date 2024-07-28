/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "../context/HistoryContext";
import { Typography, Box } from "@mui/material";
import "chart.js/auto";

export const ChartColorStreak = () => {
  const { records, loading } = useHistory();
  const [streakInfo, setStreakInfo] = useState("");

  useEffect(() => {
    if (!loading && records.length > 0) {
      let currentStreak = 1;
      let lastColor = records[0].color; // Start with the most recent color

      // Iterate from the second most recent record to the oldest
      for (let i = 1; i < records.length; i++) {
        if (records[i].color === lastColor) {
          currentStreak++;
        } else {
          break; // Break the loop if the color changes
        }
      }

      if (currentStreak >= 3 && lastColor !== "white") {
        setStreakInfo(`Color ${lastColor} is on a streak of ${currentStreak}!`);
      } else {
        setStreakInfo("");
      }
    }
  }, [loading, records]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" sx={{ color: "#ABAFB7", marginBottom: 2 }}>
        Color Streak
      </Typography>
      {streakInfo && (
        <Typography sx={{ color: "#ABAFB7", marginTop: 2 }}>
          {streakInfo}
        </Typography>
      )}
    </Box>
  );
};
