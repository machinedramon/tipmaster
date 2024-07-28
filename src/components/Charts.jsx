import { useState, useEffect } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import "chart.js/auto";
import { ChartRollsPerHour } from "./ChartRollsPerHour";
import { ChartIntervalBetweenWhite } from "./ChartIntervalBetweenWhite";
// import { ChartColorStreak } from "./ChartColorStreak";
import { PredictionDisplay } from "./PredictionDisplay";
import Lottie from "react-lottie";
import dicesAnimation from "../assets/ai-analyze.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: dicesAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid",
  },
};

export const Charts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetching or loading process
    const fetchData = async () => {
      // Replace with actual data fetching logic if necessary
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress className="text-[#F12C4C]" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <div className="grid grid-cols-[50%_50%] h-[200px] my-8">
        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
        <div className="flex flex-col justify-center">
          <Typography variant="h6">Dashboard</Typography>
          <Typography variant="body1" className="max-w-[90%]">
            Analyze real-time data with our advanced charts. <br /> The{" "}
            <Chip
              label="AI"
              size="small"
              color="primary"
              sx={{ borderRadius: "4px" }}
            />
            provides accurate predictions and insights.
          </Typography>
        </div>
      </div>
      <PredictionDisplay />
      <ChartRollsPerHour />
      <ChartIntervalBetweenWhite />
      {/* <ChartColorStreak /> */}
    </Box>
  );
};

export default Charts;
