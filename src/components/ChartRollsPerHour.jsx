/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useHistory } from "../context/HistoryContext";
import { Line } from "react-chartjs-2";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "chartjs-adapter-date-fns";

export const ChartRollsPerHour = () => {
  const { records, loading } = useHistory();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!loading && records.length > 0) {
      const redData = [];
      const blackData = [];
      const whiteData = [];

      const sortedRecords = [...records].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      const startTime = new Date(sortedRecords[0].created_at);
      const endTime = new Date(
        sortedRecords[sortedRecords.length - 1].created_at
      );

      let redCount = 0;
      let blackCount = 0;
      let whiteCount = 0;

      sortedRecords.forEach((record) => {
        const time = new Date(record.created_at);

        if (record.color === "red") {
          redCount++;
          redData.push({ x: time, y: redCount });
        } else if (record.color === "black") {
          blackCount++;
          blackData.push({ x: time, y: blackCount });
        } else if (record.color === "white") {
          whiteCount++;
          whiteData.push({ x: time, y: whiteCount });
        }
      });

      setChartData({
        datasets: [
          {
            label: "Red",
            data: redData,
            borderColor: "#F12C4C",
            backgroundColor: "rgba(241, 44, 76, 0.2)",
            fill: false,
            pointBackgroundColor: "#F12C4C",
            pointBorderColor: "#F12C4C",
            showLine: true,
            stepped: true,
          },
          {
            label: "Black",
            data: blackData,
            borderColor: "#000000",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fill: false,
            pointBackgroundColor: "#000000",
            pointBorderColor: "#000000",
            showLine: true,
            stepped: true,
          },
          {
            label: "White",
            data: whiteData,
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            fill: false,
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "#FFFFFF",
            showLine: true,
            stepped: true,
          },
        ],
      });

      setChartOptions({
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              tooltipFormat: "HH:mm",
              displayFormats: {
                hour: "HH:mm", // Adjust the format for hour labels
                minute: "HH:mm", // Adjust the format for minute labels
              },
            },
            min: startTime,
            max: endTime,
            ticks: {
              callback: function (value, index, values) {
                return new Date(value).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Count",
            },
          },
        },
        elements: {
          point: {
            radius: 1,
          },
        },
      });
    }
  }, [loading, records]);

  return (
    <>
      {Object.keys(chartData).length > 0 && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "#ABAFB7", marginBottom: 2 }}
          >
            Rolls per Hour
            <Tooltip title="This chart shows the number of rolls that occurred in each hour for each color.">
              <IconButton sx={{ color: "#ABAFB7", marginLeft: 1 }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Line data={chartData} options={chartOptions} className="p-2" />
        </Box>
      )}
    </>
  );
};
