/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "../context/HistoryContext";
import { Box, Typography, Paper } from "@mui/material";
import "chart.js/auto";

export const ChartProbabilityOfRolls = () => {
  const { records, loading } = useHistory();
  const [probabilities, setProbabilities] = useState({
    white: 0,
    red: 0,
    black: 0,
  });

  const calculateProbabilities = (records) => {
    const colorCounts = { red: 0, black: 0, white: 0 };
    const hourlyCounts = {
      red: Array(24).fill(0),
      black: Array(24).fill(0),
      white: Array(24).fill(0),
    };
    let lastWhiteIndex = -1;
    let currentStreak = 1;
    let lastColor = null;

    const intervals = [];
    let currentIntervalColors = { red: 0, black: 0 };

    records.forEach((record, index) => {
      const date = new Date(record.created_at);
      const hour = date.getHours();

      hourlyCounts[record.color][hour]++;
      colorCounts[record.color]++;

      if (record.color === "white") {
        if (lastWhiteIndex !== -1) {
          intervals.push({
            interval: index - lastWhiteIndex - 1,
            ...currentIntervalColors,
          });
        }
        lastWhiteIndex = index;
        currentIntervalColors = { red: 0, black: 0 };
      } else {
        currentIntervalColors[record.color]++;
      }

      if (record.color === lastColor) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      lastColor = record.color;
    });

    const totalRecords = records.length;
    const whiteProbability = Math.min(
      ((totalRecords - lastWhiteIndex) / totalRecords) * 100,
      99.99
    );

    const currentInterval = totalRecords - lastWhiteIndex - 1;
    intervals.push({
      interval: currentInterval,
      ...currentIntervalColors,
    });

    // Calculate probabilities with adjusted logic
    const totalColors = colorCounts.red + colorCounts.black + colorCounts.white;
    const redProbability =
      (colorCounts.red / totalColors) *
      100 *
      (1 / (currentStreak === 4 && lastColor === "red" ? 2 : 1));
    const blackProbability =
      (colorCounts.black / totalColors) *
      100 *
      (1 / (currentStreak === 4 && lastColor === "black" ? 2 : 1));
    const adjustedWhiteProbability =
      whiteProbability *
      (currentStreak === 4 && lastColor === "white" ? 1.5 : 1);

    return {
      white: Math.min(adjustedWhiteProbability, 99.99),
      red: Math.min(redProbability, 99.99),
      black: Math.min(blackProbability, 99.99),
    };
  };

  useEffect(() => {
    if (!loading && records.length > 0) {
      const newProbabilities = calculateProbabilities(records);
      setProbabilities(newProbabilities);
    }
  }, [loading, records]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" sx={{ color: "#ABAFB7", marginBottom: 2 }}>
        Probability of Rolls
      </Typography>
      <Paper
        sx={{
          backgroundColor: "#1A242D",
          padding: "16px",
          borderRadius: "8px",
          color: "#ABAFB7",
        }}
      >
        <Typography sx={{ color: "#F12C4C", marginBottom: 2 }}>
          Probability of Red Roll in Next Round: {probabilities.red.toFixed(2)}%
        </Typography>
        <Typography sx={{ color: "#000000", marginBottom: 2 }}>
          Probability of Black Roll in Next Round:{" "}
          {probabilities.black.toFixed(2)}%
        </Typography>
        <Typography sx={{ color: "#FFFFFF", marginBottom: 2 }}>
          Probability of White Roll in Next Round:{" "}
          {probabilities.white.toFixed(2)}%
        </Typography>
      </Paper>
    </Box>
  );
};
