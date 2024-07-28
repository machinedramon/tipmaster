/* eslint-disable no-undef */
const tf = require("@tensorflow/tfjs-node");

const prepareData = (records) => {
  const inputs = [];
  const labels = [];

  records.forEach((record) => {
    const date = new Date(record.created_at);
    const hour = date.getHours();
    inputs.push([hour]);
    labels.push(record.color === "red" ? 0 : record.color === "black" ? 1 : 2);
  });

  const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
  const labelTensor = tf.oneHot(tf.tensor1d(labels, "int32"), 3);

  return { inputTensor, labelTensor };
};

module.exports = prepareData;
