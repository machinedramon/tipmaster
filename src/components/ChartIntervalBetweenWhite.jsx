/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "../context/HistoryContext"; // Importa o hook do contexto
import { Bar } from "react-chartjs-2";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "chart.js/auto";

export const ChartIntervalBetweenWhite = () => {
  const { records, loading } = useHistory();
  const [intervalChartData, setIntervalChartData] = useState({});

  useEffect(() => {
    if (!loading && records.length > 0) {
      const hourlyCounts = {
        red: {},
        black: {},
        white: {},
      };
      const intervals = [];
      let lastWhiteIndex = -1;
      let currentIntervalColors = { red: 0, black: 0 };

      const colorCounts = { red: 0, black: 0, white: 0 };

      records.forEach((record, index) => {
        const date = new Date(record.created_at);
        const hour = date.getHours();

        if (!hourlyCounts.red[hour]) {
          hourlyCounts.red[hour] = 0;
          hourlyCounts.black[hour] = 0;
          hourlyCounts.white[hour] = 0;
        }

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
      });

      const totalRecords = records.length;

      const currentInterval = totalRecords - lastWhiteIndex - 1;
      intervals.push({
        interval: currentInterval,
        ...currentIntervalColors,
      });

      setIntervalChartData({
        labels: intervals.map((_, index) => `Interval ${index + 1}`).reverse(),
        datasets: [
          {
            label: "Intervals between White Rolls",
            data: intervals.reverse().map((interval) => interval.interval),
            backgroundColor: intervals
              .reverse()
              .map((interval) => [
                "rgba(241, 44, 76, 0.2)",
                "rgba(0, 0, 0, 0.2)",
              ]),
            borderColor: intervals
              .reverse()
              .map((interval) => ["rgba(241, 44, 76, 1)", "rgba(0, 0, 0, 1)"]),
            borderWidth: 1,
            stack: "combined",
          },
        ],
      });
    }
  }, [loading, records]);

  return (
    <>
      {Object.keys(intervalChartData).length > 0 && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "#ABAFB7", marginBottom: 2 }}
          >
            Intervals between White Rolls
            <Tooltip title="This chart shows the number of rolls between each white roll.">
              <IconButton sx={{ color: "#ABAFB7", marginLeft: 1 }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Bar
            data={intervalChartData}
            options={{ responsive: true }}
            className="p-2"
          />
        </Box>
      )}
    </>
  );
};
