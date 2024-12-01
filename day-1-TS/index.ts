import { rawInput } from "./input";

const rawInputLines = rawInput.split("\n");

const leftList = rawInputLines
  .map((line) => parseInt(line.split("   ")[0]))
  .toSorted();

const rightList = rawInputLines
  .map((line) => parseInt(line.split("   ")[1]))
  .toSorted();

if (leftList.length !== rightList.length) {
  throw new Error("Lists must have the same length");
}

if (
  leftList.some((value) => isNaN(value)) ||
  rightList.some((value) => isNaN(value))
) {
  throw new Error("Lists must contain only numbers");
}

// Part 1
const totalDistance = leftList.reduce(
  (acc, value, index) => acc + Math.abs(value - rightList[index]),
  0
);
console.log("total distance", totalDistance);

// Part 2
const rightListDict = Object.groupBy(rightList, (value) => value);
const similarityScore = leftList.reduce(
  (acc, value) => acc + value * (rightListDict[value]?.length ?? 0),
  0
);
console.log("similarity score", similarityScore);
