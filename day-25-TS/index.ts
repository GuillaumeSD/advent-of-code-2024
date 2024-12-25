import { rawInput } from "./input";

// Format inputs
const input = rawInput
  .split("\n\n")
  .map((schematics) => schematics.split("\n"));

// Shared functions
const isKey = (schematics: string[]) => schematics[0][0] === ".";
const isLock = (schematics: string[]) => schematics[0][0] === "#";

const canKeyOpenLock = (key: string[], lock: string[]) => {
  for (let j = 0; j < key[0].length; j++) {
    const keyHeight = key.findIndex((row) => row[j] === "#");
    const lockHeight = lock.findLastIndex((row) => row[j] === "#");

    if (lockHeight >= keyHeight) return false;
  }

  return true;
};

// Part 1
const keys = input.filter(isKey);
const locks = input.filter(isLock);

const partOneAnswer = locks.reduce(
  (acc, lock) =>
    acc +
    keys.reduce((acc, key) => (canKeyOpenLock(key, lock) ? acc + 1 : acc), 0),
  0
);
console.log("Part one answer", partOneAnswer);

// Part 2
console.log("Part two answer");
