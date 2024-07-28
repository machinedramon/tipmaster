/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import axios from "axios";
import { WebSocketServer } from "ws";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("combined"));

app.get("/api/history", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://blaze1.space/api/roulette_games/history",
      {
        params: req.query,
      }
    );
    console.log(
      `Request to /api/history with params: ${JSON.stringify(req.query)}`
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching /api/history data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/api/history_analytics", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://blaze1.space/api/roulette_games/history_analytics",
      {
        params: req.query,
      }
    );
    console.log(
      `Request to /api/history_analytics with params: ${JSON.stringify(
        req.query
      )}`
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching /api/history_analytics data:", error);
    res.status(500).send("Error fetching data");
  }
});

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

let lastData = null;

const fetchDataAndBroadcast = async () => {
  try {
    const { data } = await axios.get(
      "https://blaze1.space/api/roulette_games/current"
    );
    if (JSON.stringify(data) !== JSON.stringify(lastData)) {
      lastData = data;
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(data));
          console.log("New data fetched and sent to client:", data);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching /api/roulette_games/current data:", error);
  }
};

setInterval(fetchDataAndBroadcast, 500); // Fetch data every 1 seconds

wss.on("connection", (ws) => {
  console.log("Client connected");
  if (lastData) {
    ws.send(JSON.stringify(lastData));
    console.log("Sent initial data to client:", lastData);
  }
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
