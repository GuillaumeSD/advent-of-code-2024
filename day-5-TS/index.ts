import { rawInput } from "./input";

// Format inputs
const [rawOrderingRules, rawUpdates] = rawInput.split("\n\n");
const orderingRules = rawOrderingRules
  .split("\n")
  .map((rule) => rule.split("|").map((page) => parseInt(page)));
const updates = rawUpdates
  .split("\n")
  .map((update) => update.split(",").map((page) => parseInt(page)));

// Reusable utility functions
const isUpdateValid = (update: number[]): boolean =>
  orderingRules.every((rule) => {
    const [before, after] = rule;

    const beforeIndex = update.indexOf(before);
    if (beforeIndex === -1) return true;

    const afterIndex = update.indexOf(after);
    if (afterIndex === -1) return true;

    return beforeIndex < afterIndex;
  });

const calcUpdatesSum = (updates: number[][]): number =>
  updates.reduce(
    (acc, update) => acc + update[Math.floor(update.length / 2)],
    0
  );

// Part 1
const validUpdates = updates.filter(isUpdateValid);
console.log("Part one answer", calcUpdatesSum(validUpdates));

// Part 2
const incorrectUpdates = updates.filter((update) => !isUpdateValid(update));

const fixedUpdates = incorrectUpdates.map((update) => {
  const newUpdate = [...update];
  for (let i = 0; i < update.length; i++) {
    for (const rule of orderingRules) {
      const [before, after] = rule;
      if (after !== newUpdate[i]) continue;

      const beforeIndex = newUpdate.indexOf(before);
      if (beforeIndex < i) continue;

      newUpdate.splice(beforeIndex, 1);
      newUpdate.splice(i, 0, before);
      i--;
      break;
    }
  }
  return newUpdate;
});

console.log("Part two answer", calcUpdatesSum(fixedUpdates));
