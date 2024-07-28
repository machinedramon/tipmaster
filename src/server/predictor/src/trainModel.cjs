/* eslint-disable no-undef */
const tf = require("@tensorflow/tfjs-node");
const prepareData = require("./prepareData.cjs");
const records = require("../data/records.json");
const visualizeTraining = require("./visualizeTraining.cjs");

const { inputTensor, labelTensor } = prepareData(records);

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

const trainModel = async (model, inputTensor, labelTensor, iterations) => {
  for (let i = 0; i < iterations; i++) {
    const history = await model.fit(inputTensor, labelTensor, {
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

    visualizeTraining(history);
  }

  await model.save("file://./model");
  console.log("Model trained and saved!");
};

const model = buildModel();
trainModel(model, inputTensor, labelTensor, 10);

module.exports = trainModel;
