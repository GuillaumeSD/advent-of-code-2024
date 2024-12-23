import { rawInput } from "./input";

// Format inputs
const input = rawInput.split("\n").map((line) => line.split("-"));

// Shared functions
const getInterConnected = (input: string[][]): string[][] => {
  const interConnected: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    const [start, end] = input[i];

    const computersWithStart = getComputersConnected(input.slice(i + 1), start);
    const computersWithEnd = getComputersConnected(input.slice(i + 1), end);
    const computersInBoth = computersWithStart.filter((c) =>
      computersWithEnd.includes(c)
    );

    interConnected.push(...computersInBoth.map((c) => [start, end, c]));
  }

  return interConnected;
};

const getComputersConnected = (input: string[][], computer: string): string[] =>
  input.flatMap((otherInput) => {
    if (!otherInput.includes(computer)) return [];
    return otherInput.find((c) => c !== computer) ?? [];
  });

const hasTComputer = (connection: string[]): boolean =>
  connection.some((c) => c.startsWith("t"));

// Part 1
const connections = getInterConnected(input);
console.log("connections", connections.length);
console.log(
  "Part one answer",
  connections.reduce((acc, c) => (hasTComputer(c) ? acc + 1 : acc), 0)
);

// Part 2
const getComputersConnectedRecord = (input: string[][]): string[][] => {
  const memo: Partial<Record<string, string[]>> = {};
  const result: string[][] = [];

  for (const computer of input.flat()) {
    if (memo[computer]) continue;
    let connected = getComputersConnected(input, computer);
    connected.push(computer);

    let scores: number[];
    while (connected.length) {
      scores = connected.map((c, _, arr) => {
        const ownConnectedComputers =
          memo[c] ?? getComputersConnected(input, c);
        return arr.filter(
          (cc) => ownConnectedComputers.includes(cc) || cc === c
        ).length;
      });
      if (scores.every((s) => s === connected.length)) break;

      const minScore = Math.min(...scores);
      connected = connected.filter((_, i) => scores[i] > minScore);
    }

    memo[computer] = connected;
    result.push(connected);
  }

  return result;
};

const res = getComputersConnectedRecord(input);
const maxNb = Math.max(...res.map((r) => r.length));
const computers = res.find((r) => r.length === maxNb);
console.log("Part two answer", computers?.sort()?.join(","));
