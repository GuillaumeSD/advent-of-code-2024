import { rawInput } from "./input";

// Format inputs
const input = rawInput.split("\n").map((line) => line.split(""));

// Shared functions
const sumAntinodeNb = (map: string[][]) =>
  map.reduce(
    (acc, line) => acc + line.filter((cell) => cell === "#").length,
    0
  );

// Part 1
const antinodePartOneMap = input.map((line) => line.slice().fill("."));
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === ".") continue;
    const antenna = input[i][j];

    for (let k = i; k < input.length; k++) {
      for (let m = 0; m < input[k].length; m++) {
        if (i === k && j <= m) continue;
        if (input[k][m] !== antenna) continue;

        const xDiff = k - i;
        const yDiff = m - j;

        for (const [antinodeX, antinodeY] of [
          [i - xDiff, j - yDiff],
          [k + xDiff, m + yDiff],
        ]) {
          if (
            antinodeX >= 0 &&
            antinodeY >= 0 &&
            antinodeX < input.length &&
            antinodeY < input[antinodeX].length
          ) {
            antinodePartOneMap[antinodeX][antinodeY] = "#";
          }
        }
      }
    }
  }
}
console.log("Part one answer", sumAntinodeNb(antinodePartOneMap));

// Part 2
const antinodePartTwoMap = input.map((line) => line.slice().fill("."));
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === ".") continue;
    const antenna = input[i][j];

    for (let k = i; k < input.length; k++) {
      for (let m = 0; m < input[k].length; m++) {
        if (i === k && j <= m) continue;
        if (input[k][m] !== antenna) continue;

        const xDiff = k - i;
        const yDiff = m - j;

        let nb = 0;
        let atLeastOneIsInside = false;
        do {
          atLeastOneIsInside = false;

          for (const [antinodeX, antinodeY] of [
            [i - xDiff * nb, j - yDiff * nb],
            [k + xDiff * nb, m + yDiff * nb],
          ]) {
            if (
              antinodeX >= 0 &&
              antinodeY >= 0 &&
              antinodeX < input.length &&
              antinodeY < input[antinodeX].length
            ) {
              atLeastOneIsInside = true;
              antinodePartTwoMap[antinodeX][antinodeY] = "#";
            }
          }

          nb++;
        } while (atLeastOneIsInside);
      }
    }
  }
}
console.log("Part two answer", sumAntinodeNb(antinodePartTwoMap));
