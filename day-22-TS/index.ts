import { rawInput } from "./input";

// Format inputs
const input = rawInput.split("\n").map((nb) => parseInt(nb));

// Shared functions
const getNextNumber = (current: number): number => {
  let nextNumber = mixAndPrune(current * 64, current);
  nextNumber = mixAndPrune(Math.floor(nextNumber / 32), nextNumber);
  nextNumber = mixAndPrune(nextNumber * 2048, nextNumber);

  return nextNumber;
};

const mixAndPrune = (result: number, input: number): number => {
  return Number(BigInt(result) ^ BigInt(input)) % 16777216;
};

const getSecretAfterN = (secret: number, n: number): number => {
  let current = secret;

  for (let i = 0; i < n; i++) {
    current = getNextNumber(current);
  }

  return current;
};

// Part 1
const results = input.map((secret) => getSecretAfterN(secret, 2000));
const sum = results.reduce((acc, current) => acc + current, 0);
console.log("Part one answer", sum);

// Part 2
const getAllPricesAfterN = (secret: number, n: number): number[] => {
  let current = secret;
  const prices = [];

  for (let i = 0; i < n; i++) {
    current = getNextNumber(current);
    prices.push(current % 10);
  }

  return prices;
};

const getPricesSequence = (
  prices: number[]
): { price: number; sequence: number[] }[] => {
  const result: { price: number; sequence: number[] }[] = [];

  for (let i = 4; i < prices.length; i++) {
    const sequence = [
      prices[i - 3] - prices[i - 4],
      prices[i - 2] - prices[i - 3],
      prices[i - 1] - prices[i - 2],
      prices[i] - prices[i - 1],
    ];
    const price = prices[i];

    if (
      result.some((val) =>
        val.sequence.every((nb, index) => nb === sequence[index])
      )
    ) {
      continue;
    }

    result.push({ sequence, price });
  }

  return result;
};

const allPrices = input.map((secret) => getAllPricesAfterN(secret, 2000));
const allSequences = allPrices.map((prices) => getPricesSequence(prices));

const bestScore: { score: number; sequence: number[] } = {
  score: 0,
  sequence: [],
};
for (const seq of allSequences.flat()) {
  const sequences = allSequences.map((g) =>
    g.find((v) => v.sequence.every((nb, index) => nb === seq.sequence[index]))
  );

  const score = sequences.reduce(
    (acc, current) => acc + (current?.price ?? 0),
    0
  );
  if (score > bestScore.score) {
    bestScore.score = score;
    bestScore.sequence = seq.sequence;
    console.log("New best score", score);
  }
}

console.log("Part two answer", bestScore.score);
