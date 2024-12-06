import { rawInput } from "./input";

// Part 1
const allMul = rawInput.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
const totalSumPart1 = allMul.reduce(
  (acc, match) => acc + parseInt(match[1]) * parseInt(match[2]),
  0
);
console.log("total sum part 1", totalSumPart1);

// Part 2
let areMulEnabled = true;
const allFn = rawInput.matchAll(
  /mul\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g
);
const totalSumPart2 = allFn.reduce((acc, match) => {
  if (match[0] === "do()") {
    areMulEnabled = true;
    return acc;
  }

  if (match[0] === "don't()") {
    areMulEnabled = false;
    return acc;
  }

  if (!areMulEnabled) return acc;
  return acc + parseInt(match[1]) * parseInt(match[2]);
}, 0);
console.log("total sum part 2", totalSumPart2);
