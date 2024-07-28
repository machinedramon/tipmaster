/* eslint-disable no-undef */
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const analyzePatterns = require("./analyzePatterns.cjs");
const prepareData = require("./prepareData.cjs");

const loadModel = async () => {
  const model = await tf.loadLayersModel("file://./model/model.json");
  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });
  return model;
};

const buildModel = () => {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [1], units: 10, activation: "relu" })
  );
  model.add(tf.layers.dense({ units: 10, activation: "relu" }));
  model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
};

const predictColor = async (model, hour) => {
  const prediction = model.predict(tf.tensor2d([hour], [1, 1]));
  const probabilities = prediction.dataSync();

  const colors = ["red", "black", "white"];
  const result = {};

  colors.forEach((color, index) => {
    result[color] = probabilities[index] * 100;
  });

  return result;
};

const logPredictionResults = (logFilePath, results) => {
  const logFileExists = fs.existsSync(logFilePath);
  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

  if (!logFileExists) {
    logStream.write(
      "epoch,red_probability,black_probability,white_probability,predicted_color\n"
    );
  }

  results.forEach((result) => {
    logStream.write(
      `${result.epoch},${result.red?.toFixed(2) || 0},${
        result.black?.toFixed(2) || 0
      },${result.white?.toFixed(2) || 0},${result.predictedColor}\n`
    );
  });

  logStream.end();
};

const reinforceLearning = async (
  model,
  newRecords,
  targetColor,
  logFilePath
) => {
  const { inputTensor } = prepareData(newRecords);
  const targetIndex =
    targetColor === "red" ? 0 : targetColor === "black" ? 1 : 2;

  const predictions = model.predict(inputTensor).argMax(-1).dataSync();
  const incorrectIndices = predictions
    .map((pred, index) => (pred !== targetIndex ? index : null))
    .filter((index) => index !== null);

  if (incorrectIndices.length > 0) {
    const incorrectInputs = inputTensor.gather(
      tf.tensor1d(incorrectIndices, "int32")
    );
    const incorrectLabels = tf.oneHot(
      tf.tensor1d(Array(incorrectIndices.length).fill(targetIndex), "int32"),
      3
    );

    await model.fit(incorrectInputs, incorrectLabels, {
      epochs: 10,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: [
        tf.callbacks.earlyStopping({
          monitor: "val_loss",
          patience: 3,
        }),
      ],
    });

    await model.save("file://./model");
  }

  const results = incorrectIndices.map((index) => {
    const hour = inputTensor
      .gather(tf.tensor1d([index], "int32"))
      .dataSync()[0];
    const probabilities = model.predict(tf.tensor2d([hour], [1, 1])).dataSync();
    const predictedColor = ["red", "black", "white"].find(
      (color, idx) => probabilities[idx] === Math.max(...probabilities)
    );

    return {
      epoch: index,
      red: probabilities[0],
      black: probabilities[1],
      white: probabilities[2],
      predictedColor,
    };
  });

  logPredictionResults(logFilePath, results);
};

const savePatternsToFile = (patterns, filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(patterns, null, 2));
};

const predictNewData = async (filePath, model) => {
  const newRecords = JSON.parse(fs.readFileSync(filePath));
  const lastRecord = newRecords[newRecords.length - 1];
  const date = new Date(lastRecord.created_at);
  const hour = date.getHours();

  const patterns = analyzePatterns(newRecords);
  console.log("New data patterns analysis:", patterns);

  // Save patterns to a JSON file
  savePatternsToFile(patterns, "./patterns.json");

  const probabilities = await predictColor(model, hour);
  console.log("Probabilities for the next roll:");
  console.log(`Red: ${probabilities.red.toFixed(2)}%`);
  console.log(`Black: ${probabilities.black.toFixed(2)}%`);
  console.log(`White: ${probabilities.white.toFixed(2)}%`);

  const maxProbability = Math.max(
    probabilities.red,
    probabilities.black,
    probabilities.white
  );
  const predictedColor = Object.keys(probabilities).find(
    (color) => probabilities[color] === maxProbability
  );
  console.log(`Predicted color for the next roll: ${predictedColor}`);

  return { predictedColor, patterns };
};

const main = async () => {
  const filePath = "../data/records.json";
  const targetColor = "red"; // Change this to test different target colors
  let model;

  // Load existing model if available, otherwise create a new one
  try {
    model = await loadModel();
  } catch (error) {
    model = buildModel();
  }

  let correctStreak = 0;
  const maxStreak = 10;

  while (correctStreak < maxStreak) {
    const { predictedColor } = await predictNewData(filePath, model);
    if (predictedColor === targetColor) {
      correctStreak++;
      console.log(`Streak: ${correctStreak}`);
    } else {
      correctStreak = 0;
      await reinforceLearning(
        model,
        JSON.parse(fs.readFileSync(filePath)),
        targetColor,
        "./prediction_logs.csv"
      );
    }
  }

  console.log(
    `Achieved a streak of ${maxStreak} correct predictions of ${targetColor}`
  );
};

main();

module.exports = predictColor;
