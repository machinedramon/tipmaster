import { useEffect, useState } from "react";
import { useHistory } from "../../context/HistoryContext";
import patterns from "./patterns.json";

// Função para calcular as porcentagens de saída com base nos dados de patterns.json
const calculateNextColorProbabilities = (
  patterns,
  hourFrequencies,
  minuteFrequencies,
  currentHour,
  currentMinute,
  currentSecond,
  lastRecord,
  records
) => {
  const {
    averageIntervalWhite,
    mostFrequentHoursWhite,
    mostFrequentMinutesWhite,
    mostFrequentHoursRed,
    mostFrequentMinutesRed,
    mostFrequentHoursBlack,
    mostFrequentMinutesBlack,
    whiteProbability,
    whiteAfterWhiteFrequency,
    whiteAfterWhiteSequenceFrequency,
  } = patterns;

  // Obtendo as porcentagens por hora
  const hourProbabilities = hourFrequencies[currentHour.toString()] || {
    red: 0,
    black: 0,
    white: 0,
  };

  // Obtendo as porcentagens por minuto
  const minuteProbabilities = minuteFrequencies[currentMinute.toString()] || {
    red: 0,
    black: 0,
    white: 0,
  };

  // Calculando a média ponderada das probabilidades de hora e minuto
  let weightedRedProbability =
    (hourProbabilities.red + minuteProbabilities.red) / 2;
  let weightedBlackProbability =
    (hourProbabilities.black + minuteProbabilities.black) / 2;
  let weightedWhiteProbability =
    (hourProbabilities.white + minuteProbabilities.white) / 2;

  // Ajustando as probabilidades para o futuro próximo (próximos 30 segundos)
  const futureSecond = (currentSecond + 30) % 60;
  const futureMinuteProbabilities = minuteFrequencies[
    futureSecond.toString()
  ] || {
    red: 0,
    black: 0,
    white: 0,
  };

  weightedRedProbability =
    (weightedRedProbability + futureMinuteProbabilities.red) / 2;
  weightedBlackProbability =
    (weightedBlackProbability + futureMinuteProbabilities.black) / 2;
  weightedWhiteProbability =
    (weightedWhiteProbability + futureMinuteProbabilities.white) / 2;

  // Considerar o intervalo médio entre brancos
  const lastWhiteIndex = records
    .slice()
    .reverse()
    .findIndex((record) => record.color === "white");

  let timeSinceLastWhite = 0;
  if (lastWhiteIndex !== -1) {
    const lastWhiteTime = new Date(
      records[records.length - 1 - lastWhiteIndex].created_at
    ).getTime();
    const currentTime = new Date(lastRecord.created_at).getTime();
    timeSinceLastWhite = (currentTime - lastWhiteTime) / 1000 / 60; // em minutos

    const rollsSinceLastWhite = records.length - 1 - lastWhiteIndex;

    if (rollsSinceLastWhite > averageIntervalWhite) {
      const increaseFactor =
        1 + (rollsSinceLastWhite - averageIntervalWhite) / averageIntervalWhite;
      weightedWhiteProbability *= increaseFactor; // aumentar a probabilidade de branco conforme a média
    }
  }

  // Ajuste baseado nas horas e minutos mais frequentes
  if (mostFrequentHoursWhite.includes(currentHour)) {
    weightedWhiteProbability *= 1.2;
  }
  if (mostFrequentMinutesWhite.includes(currentMinute)) {
    weightedWhiteProbability *= 1.2;
  }
  if (mostFrequentHoursRed.includes(currentHour)) {
    weightedRedProbability *= 1.2;
  }
  if (mostFrequentMinutesRed.includes(currentMinute)) {
    weightedRedProbability *= 1.2;
  }
  if (mostFrequentHoursBlack.includes(currentHour)) {
    weightedBlackProbability *= 1.2;
  }
  if (mostFrequentMinutesBlack.includes(currentMinute)) {
    weightedBlackProbability *= 1.2;
  }

  // Ajuste baseado em whiteAfterWhiteFrequency e whiteAfterWhiteSequenceFrequency
  const lastColor = records[records.length - 1].color;
  if (lastColor === "white") {
    weightedWhiteProbability *= 1 + whiteAfterWhiteFrequency;
    weightedWhiteProbability *= whiteAfterWhiteSequenceFrequency;
  }

  // Ajustar a probabilidade de branco com base na média histórica
  const whiteAdjustmentFactor =
    1 + (whiteProbability - weightedWhiteProbability) / 100;
  weightedWhiteProbability *= whiteAdjustmentFactor;

  // Ajuste baseado na sequência de cores
  const recentRecords = records.slice(-10); // Considerar as últimas 10 rodadas
  const redCount = recentRecords.filter(
    (record) => record.color === "red"
  ).length;
  const blackCount = recentRecords.filter(
    (record) => record.color === "black"
  ).length;

  if (redCount > blackCount) {
    weightedBlackProbability *=
      1 + (redCount - blackCount) / recentRecords.length;
  } else {
    weightedRedProbability *=
      1 + (blackCount - redCount) / recentRecords.length;
  }

  // Normalizar as probabilidades para somarem 100%
  const totalProbability =
    weightedRedProbability +
    weightedBlackProbability +
    weightedWhiteProbability;
  const finalRedProbability = (weightedRedProbability / totalProbability) * 100;
  const finalBlackProbability =
    (weightedBlackProbability / totalProbability) * 100;
  const finalWhiteProbability =
    (weightedWhiteProbability / totalProbability) * 100;

  return {
    red: finalRedProbability,
    black: finalBlackProbability,
    white: finalWhiteProbability,
    timeSinceLastWhite,
    averageIntervalWhite, // Certificar-se de que averageIntervalWhite está acessível
  };
};

// Função para calcular as frequências de cores por hora e minuto
const calculateColorFrequencies = (patterns) => {
  const { hourlyCounts, minuteCounts } = patterns;
  const hourFrequencies = {};
  const minuteFrequencies = {};

  Object.keys(hourlyCounts).forEach((hour) => {
    const total =
      hourlyCounts[hour].red +
      hourlyCounts[hour].black +
      hourlyCounts[hour].white;
    hourFrequencies[hour] = {
      red: (hourlyCounts[hour].red / total) * 100,
      black: (hourlyCounts[hour].black / total) * 100,
      white: (hourlyCounts[hour].white / total) * 100,
    };
  });

  Object.keys(minuteCounts).forEach((minute) => {
    const total =
      minuteCounts[minute].red +
      minuteCounts[minute].black +
      minuteCounts[minute].white;
    minuteFrequencies[minute] = {
      red: (minuteCounts[minute].red / total) * 100,
      black: (minuteCounts[minute].black / total) * 100,
      white: (minuteCounts[minute].white / total) * 100,
    };
  });

  return { hourFrequencies, minuteFrequencies };
};

// Função principal para analisar os dados e prever a próxima cor
const analyzeAndPredict = (records) => {
  const { hourFrequencies, minuteFrequencies } =
    calculateColorFrequencies(patterns);

  // Obter a hora, minuto e segundo atuais
  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();
  const currentSecond = currentDateTime.getSeconds();
  const lastRecord = records[records.length - 1];

  // Calcular as probabilidades das cores com base nos padrões e no tempo atual
  const {
    red: redProbability,
    black: blackProbability,
    white: whiteProbability,
    timeSinceLastWhite,
    averageIntervalWhite,
  } = calculateNextColorProbabilities(
    patterns,
    hourFrequencies,
    minuteFrequencies,
    currentHour,
    currentMinute,
    currentSecond,
    lastRecord,
    records
  );

  const probabilities = {
    red: redProbability,
    black: blackProbability,
    white: whiteProbability,
  };

  console.log("Probabilities for the next roll:");
  console.log(`Red: ${probabilities.red.toFixed(2)}%`);
  console.log(`Black: ${probabilities.black.toFixed(2)}%`);
  console.log(`White: ${probabilities.white.toFixed(2)}%`);

  const maxProbability = Math.max(
    probabilities.red,
    probabilities.black,
    probabilities.white
  );

  // Sistema de redução de obviedade e ajuste para sugerir branco
  let predictedColor;
  const randomFactor = Math.random();
  const adjustedWhiteProbability =
    probabilities.white + Math.exp((timeSinceLastWhite / 25) * 2);

  // Nova lógica para considerar brancos mais frequentemente com base no intervalo
  if (
    (timeSinceLastWhite > averageIntervalWhite &&
      Math.random() < adjustedWhiteProbability / 100) ||
    (adjustedWhiteProbability > 25 && timeSinceLastWhite > averageIntervalWhite)
  ) {
    predictedColor = "white";
  } else if (maxProbability - randomFactor * 10 > 50) {
    predictedColor = Object.keys(probabilities).find(
      (color) => probabilities[color] === maxProbability
    );
  } else {
    const adjustedProbabilities = Object.keys(probabilities).map((color) => ({
      color,
      probability: probabilities[color] - randomFactor,
    }));
    adjustedProbabilities.sort((a, b) => b.probability - a.probability);
    predictedColor = adjustedProbabilities[0].color;
  }

  // Certificar que o branco é sugerido às vezes
  if (Math.random() < 0.1 && timeSinceLastWhite > averageIntervalWhite) {
    predictedColor = "white";
  }

  console.log(`Predicted color for the next roll: ${predictedColor}`);

  return {
    probabilities,
    predictedColor,
  };
};

const useAnalyzeAndPredict = () => {
  const { records } = useHistory();
  const [result, setResult] = useState({
    probabilities: null,
    predictedColor: null,
  });

  useEffect(() => {
    if (records.length > 0) {
      const result = analyzeAndPredict(records);
      setResult(result);
    }
  }, [records]);

  return result;
};

export default useAnalyzeAndPredict;
