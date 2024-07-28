/* eslint-disable no-undef */
const analyzePatterns = (records) => {
  const hourlyCounts = {
    red: Array(24).fill(0),
    black: Array(24).fill(0),
    white: Array(24).fill(0),
  };
  const minuteCounts = {
    red: Array(60).fill(0),
    black: Array(60).fill(0),
    white: Array(60).fill(0),
  };
  const colorCounts = { red: 0, black: 0, white: 0 };
  const whiteIntervals = [];
  const whiteAfterWhite = [];
  const whiteAfterWhiteSequences = [];

  let lastWhiteIndex = -1;
  let currentSequence = 0;
  let lastColor = null;

  records.forEach((record, index) => {
    const date = new Date(record.created_at);
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Contagem de cores
    colorCounts[record.color]++;
    hourlyCounts[record.color][hour]++;
    minuteCounts[record.color][minute]++;

    if (record.color === "white") {
      if (lastWhiteIndex !== -1) {
        whiteIntervals.push(index - lastWhiteIndex);
      }
      if (lastColor === "white") {
        whiteAfterWhite.push(index - lastWhiteIndex);
        whiteAfterWhiteSequences.push(currentSequence);
      }
      lastWhiteIndex = index;
    }

    if (record.color === lastColor) {
      currentSequence++;
    } else {
      if (lastColor !== null) {
        currentSequence = 1;
      }
    }
    lastColor = record.color;
  });

  const totalRecords = records.length;
  const averageIntervalWhite =
    whiteIntervals.reduce((a, b) => a + b, 0) / whiteIntervals.length;

  // Função auxiliar para encontrar os N minutos/horas mais frequentes
  const findMostFrequent = (counts, n) => {
    return counts
      .map((count, index) => ({ index, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, n)
      .map((item) => item.index);
  };

  const mostFrequentHoursWhite = findMostFrequent(hourlyCounts.white, 4);
  const mostFrequentMinutesWhite = findMostFrequent(minuteCounts.white, 4);
  const mostFrequentHoursRed = findMostFrequent(hourlyCounts.red, 4);
  const mostFrequentMinutesRed = findMostFrequent(minuteCounts.red, 4);
  const mostFrequentHoursBlack = findMostFrequent(hourlyCounts.black, 4);
  const mostFrequentMinutesBlack = findMostFrequent(minuteCounts.black, 4);

  // Calculando porcentagens por cor por hora e minuto
  const calculatePercentages = (counts) => {
    const percentages = {};
    Object.keys(counts.red).forEach((index) => {
      const total =
        counts.red[index] + counts.black[index] + counts.white[index];
      percentages[index] = {
        red: total ? (counts.red[index] / total) * 100 : 0,
        black: total ? (counts.black[index] / total) * 100 : 0,
        white: total ? (counts.white[index] / total) * 100 : 0,
      };
    });
    return percentages;
  };

  const hourlyPercentages = calculatePercentages(hourlyCounts);
  const minutePercentages = calculatePercentages(minuteCounts);

  // Frequência de brancos após brancos
  const whiteAfterWhiteFrequency =
    whiteAfterWhite.length / whiteIntervals.length;
  const whiteAfterWhiteSequenceFrequency =
    whiteAfterWhiteSequences.reduce((a, b) => a + b, 0) /
    whiteAfterWhiteSequences.length;

  return {
    averageIntervalWhite,
    mostFrequentHoursWhite,
    mostFrequentMinutesWhite,
    mostFrequentHoursRed,
    mostFrequentMinutesRed,
    mostFrequentHoursBlack,
    mostFrequentMinutesBlack,
    hourlyCounts: hourlyPercentages,
    minuteCounts: minutePercentages,
    redProbability: (colorCounts.red / totalRecords) * 100,
    blackProbability: (colorCounts.black / totalRecords) * 100,
    whiteProbability: (colorCounts.white / totalRecords) * 100,
    adjustedRedProbability: (colorCounts.red / totalRecords) * 90,
    adjustedBlackProbability: (colorCounts.black / totalRecords) * 90,
    adjustedWhiteProbability: (colorCounts.white / totalRecords) * 120,
    whiteAfterWhiteFrequency,
    whiteAfterWhiteSequenceFrequency,
  };
};

module.exports = analyzePatterns;
