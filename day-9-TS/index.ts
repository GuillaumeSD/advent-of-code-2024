import { rawInput } from "./input";

// Format inputs
const input = rawInput.split("").map((digit) => parseInt(digit));

const inputBlocks: (number | ".")[][] = input.map((digit, index) => {
  const isFreeSpace = index % 2 !== 0;
  if (isFreeSpace) return Array(digit).fill(".");

  const fileId = Math.floor(index / 2);
  return Array(digit).fill(fileId);
});

// Shared functions
const checkSum = (blocks: (number | ".")[]) =>
  blocks.reduce<number>(
    (acc, digit, index) => acc + index * (digit === "." ? 0 : digit),
    0
  );

// Part 1
const partOneBlocks = inputBlocks.flat();
for (let i = 0; i < partOneBlocks.length; i++) {
  if (partOneBlocks[i] !== ".") continue;

  const digitIdx = partOneBlocks.findLastIndex((digit) => digit !== ".");
  if (digitIdx <= i) break;

  partOneBlocks[i] = partOneBlocks[digitIdx];
  partOneBlocks[digitIdx] = ".";
}

console.log("Part one answer", checkSum(partOneBlocks));

// Part 2
for (let i = 0; i < inputBlocks.length; i++) {
  if (inputBlocks[i][0] !== ".") continue;

  const blockIdx = inputBlocks.findLastIndex(
    (digits) =>
      digits.length > 0 &&
      digits[0] !== "." &&
      digits.length <= inputBlocks[i].length
  );
  if (blockIdx <= i) continue;

  const lengthDiff = inputBlocks[i].length - inputBlocks[blockIdx].length;

  inputBlocks[i] = [...inputBlocks[blockIdx]];
  inputBlocks[blockIdx] = inputBlocks[blockIdx].map(() => ".");

  if (lengthDiff > 0) {
    inputBlocks.splice(i + 1, 0, Array(lengthDiff).fill("."));
  }
}

console.log("Part two answer", checkSum(inputBlocks.flat()));
