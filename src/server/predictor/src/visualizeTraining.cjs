/* eslint-disable no-undef */
const { createCanvas } = require("canvas");
const { Chart, registerables } = require("chart.js");
const fs = require("fs");

Chart.register(...registerables); // Registrando todas as escalas e componentes necessários

const visualizeTraining = (history) => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: history.epoch,
      datasets: [
        {
          label: "Training Loss",
          data: history.history.loss,
          borderColor: "red",
          fill: false,
        },
        {
          label: "Validation Loss",
          data: history.history.val_loss,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          type: "category",
          display: true,
          title: {
            display: true,
            text: "Epoch",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Loss",
          },
        },
      },
    },
  });

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./training-history.png", buffer);
};

module.exports = visualizeTraining;
