import { rawInput } from "./input";

const inputArray = rawInput.split("\n");

// Part 1
let partOneOccurences = 0;
for (let i = 0; i < inputArray.length; i++) {
  for (let j = 0; j < inputArray[i].length; j++) {
    if (inputArray[i][j] !== "X") continue;

    // right
    if (
      j + 3 < inputArray[i].length &&
      inputArray[i][j + 1] === "M" &&
      inputArray[i][j + 2] === "A" &&
      inputArray[i][j + 3] === "S"
    ) {
      partOneOccurences++;
    }

    // left
    if (
      j - 3 >= 0 &&
      inputArray[i][j - 1] === "M" &&
      inputArray[i][j - 2] === "A" &&
      inputArray[i][j - 3] === "S"
    ) {
      partOneOccurences++;
    }

    // up
    if (
      i + 3 < inputArray.length &&
      inputArray[i + 1][j] === "M" &&
      inputArray[i + 2][j] === "A" &&
      inputArray[i + 3][j] === "S"
    ) {
      partOneOccurences++;
    }

    // down
    if (
      i - 3 >= 0 &&
      inputArray[i - 1][j] === "M" &&
      inputArray[i - 2][j] === "A" &&
      inputArray[i - 3][j] === "S"
    ) {
      partOneOccurences++;
    }

    // diagonal right up
    if (
      i - 3 >= 0 &&
      j + 3 < inputArray[i].length &&
      inputArray[i - 1][j + 1] === "M" &&
      inputArray[i - 2][j + 2] === "A" &&
      inputArray[i - 3][j + 3] === "S"
    ) {
      partOneOccurences++;
    }

    // diagonal left up
    if (
      i - 3 >= 0 &&
      j - 3 >= 0 &&
      inputArray[i - 1][j - 1] === "M" &&
      inputArray[i - 2][j - 2] === "A" &&
      inputArray[i - 3][j - 3] === "S"
    ) {
      partOneOccurences++;
    }

    // diagonal left down
    if (
      i + 3 < inputArray.length &&
      j - 3 >= 0 &&
      inputArray[i + 1][j - 1] === "M" &&
      inputArray[i + 2][j - 2] === "A" &&
      inputArray[i + 3][j - 3] === "S"
    ) {
      partOneOccurences++;
    }

    // diagonal right down
    if (
      i + 3 < inputArray.length &&
      j + 3 < inputArray[i].length &&
      inputArray[i + 1][j + 1] === "M" &&
      inputArray[i + 2][j + 2] === "A" &&
      inputArray[i + 3][j + 3] === "S"
    ) {
      partOneOccurences++;
    }
  }
}
console.log("XMAS occurences", partOneOccurences);

// Part 2
let partTwoOccurences = 0;
for (let i = 1; i < inputArray.length - 1; i++) {
  for (let j = 1; j < inputArray[i].length - 1; j++) {
    if (inputArray[i][j] !== "A") continue;

    // diagonal left down to right up
    const slashMS =
      (inputArray[i - 1][j + 1] === "M" && inputArray[i + 1][j - 1] === "S") ||
      (inputArray[i - 1][j + 1] === "S" && inputArray[i + 1][j - 1] === "M");
    if (!slashMS) continue;

    // diagonal left up to right down
    const antiSlashMS =
      (inputArray[i - 1][j - 1] === "M" && inputArray[i + 1][j + 1] === "S") ||
      (inputArray[i - 1][j - 1] === "S" && inputArray[i + 1][j + 1] === "M");
    if (!antiSlashMS) continue;

    partTwoOccurences++;
  }
}
console.log("X-MAS occurences", partTwoOccurences);
