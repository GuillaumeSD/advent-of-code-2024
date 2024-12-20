import { rawInput } from "./input";

// Format inputs
const [rawTowels, rawDesigns] = rawInput.split("\n\n");
const towels = rawTowels.split(", ");
const designs = rawDesigns.split("\n");

// Shared functions
const isDesignPossible = (design: string): boolean => {
  for (const towel of towels) {
    if (!design.startsWith(towel)) continue;
    const remaining = design.slice(towel.length);

    if (remaining.length === 0) return true;
    if (isDesignPossible(remaining)) return true;
  }

  return false;
};

const memo: Partial<Record<string, number>> = {};

const getDesignArrangementsCount = (design: string): number =>
  towels.reduce((acc, towel) => {
    if (!design.startsWith(towel)) return acc;
    const remaining = design.slice(towel.length);

    if (remaining.length === 0) return acc + 1;

    if (memo[remaining] !== undefined) return acc + memo[remaining];

    const count = getDesignArrangementsCount(remaining);
    memo[remaining] = count;
    return acc + count;
  }, 0);

// Part 1
console.log(
  "Part one answer",
  designs.filter((design) => isDesignPossible(design)).length
);

// Part 2
console.log(
  "Part two answer",
  designs.reduce((acc, design) => acc + getDesignArrangementsCount(design), 0)
);
