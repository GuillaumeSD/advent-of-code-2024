import { rawInput } from "./input";

// Format inputs
const stonesInput = rawInput.split(" ").map((nb) => parseInt(nb));

type StonesMap = Partial<Record<string, number>>;
let stonesMap: StonesMap = {};
for (const stone of stonesInput) {
  stonesMap[stone] = (stonesMap[stone] ?? 0) + 1;
}

// Shared functions
const memo: Record<number, number[] | undefined> = {};

const getNextStone = (stone: number): number[] => {
  if (stone === 0) return [1];

  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const firstHalf = stoneStr.slice(0, stoneStr.length / 2);
    const secondHalf = stoneStr.slice(stoneStr.length / 2);
    return [parseInt(firstHalf), parseInt(secondHalf)];
  }

  return [stone * 2024];
};

const getNextStonesMap = (stones: StonesMap): StonesMap => {
  const newStonesMap: StonesMap = {};

  for (const [stoneKey, quantity] of Object.entries(stones)) {
    if (!quantity) continue;
    const stone = parseInt(stoneKey);
    const stoneMemo = memo[stone];

    const nextStones = stoneMemo ?? getNextStone(stone);
    if (!stoneMemo) memo[stone] = nextStones;

    for (const nextStone of nextStones) {
      newStonesMap[nextStone] = (newStonesMap[nextStone] ?? 0) + quantity;
    }
  }

  return newStonesMap;
};

const getNumberOfStones = (stones: StonesMap): number =>
  Object.values(stones).reduce<number>(
    (acc, quantity) => acc + (quantity ?? 0),
    0
  );

const getStonesNbAfterNIterations = (stones: StonesMap, n: number): number => {
  let stonesMapTemp = { ...stones };
  for (let i = 0; i < n; i++) {
    stonesMapTemp = getNextStonesMap(stonesMapTemp);
  }

  return getNumberOfStones(stonesMapTemp);
};

// Part 1
console.log("Part one answer", getStonesNbAfterNIterations(stonesMap, 25));

// Part 2
console.log("Part two answer", getStonesNbAfterNIterations(stonesMap, 75));
