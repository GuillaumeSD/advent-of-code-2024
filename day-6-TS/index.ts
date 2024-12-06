import { rawInput } from "./input";

// Format inputs
const inputMap = rawInput.split("\n").map((row) => row.split(""));

// Shared functions
const calcPath = (
  fnInputMap: string[][]
): { map: string[][]; isInfiniteLoop: boolean } => {
  const map = fnInputMap.map((row) => [...row]);
  let guardXPosition = map.findIndex((row) => row.includes("^"));
  let guardYPosition = map[guardXPosition].indexOf("^");
  let guardDirection: "up" | "right" | "down" | "left" = "up";

  while (
    guardXPosition >= 0 &&
    guardYPosition >= 0 &&
    guardXPosition < map.length &&
    guardYPosition < map[0].length
  ) {
    switch (guardDirection) {
      case "up":
        if (
          guardXPosition - 1 >= 0 &&
          map[guardXPosition - 1][guardYPosition] === "#"
        ) {
          guardDirection = "right";
          break;
        }

        if (guardXPosition - 1 >= 0) {
          if (map[guardXPosition - 1][guardYPosition] === "^") {
            return { map, isInfiniteLoop: true };
          }
          map[guardXPosition - 1][guardYPosition] = "^";
        }

        guardXPosition--;
        break;
      case "right":
        if (
          guardYPosition + 1 < map[0].length &&
          map[guardXPosition][guardYPosition + 1] === "#"
        ) {
          guardDirection = "down";
          break;
        }

        if (guardYPosition + 1 < map[0].length) {
          if (map[guardXPosition][guardYPosition + 1] === ">") {
            return { map, isInfiniteLoop: true };
          }
          map[guardXPosition][guardYPosition + 1] = ">";
        }

        guardYPosition++;
        break;
      case "down":
        if (
          guardXPosition + 1 < map.length &&
          map[guardXPosition + 1][guardYPosition] === "#"
        ) {
          guardDirection = "left";
          break;
        }

        if (guardXPosition + 1 < map.length) {
          if (map[guardXPosition + 1][guardYPosition] === "⌄") {
            return { map, isInfiniteLoop: true };
          }
          map[guardXPosition + 1][guardYPosition] = "⌄";
        }

        guardXPosition++;
        break;
      case "left":
        if (
          guardYPosition - 1 >= 0 &&
          map[guardXPosition][guardYPosition - 1] === "#"
        ) {
          guardDirection = "up";
          break;
        }

        if (guardYPosition - 1 >= 0) {
          if (map[guardXPosition][guardYPosition - 1] === "<") {
            return { map, isInfiniteLoop: true };
          }
          map[guardXPosition][guardYPosition - 1] = "<";
        }

        guardYPosition--;
    }
  }

  return { map, isInfiniteLoop: false };
};

// Part 1
const { map: mapPartOne } = calcPath(inputMap);
const positonsVisited = mapPartOne
  .flat()
  .filter((position) => ["^", ">", "⌄", "<"].includes(position)).length;
console.log("Part one answer", positonsVisited);

// Part 2
let obstructionPathsNb = 0;
for (let i = 0; i < inputMap.length; i++) {
  for (let j = 0; j < inputMap[0].length; j++) {
    if (
      inputMap[i][j] === "#" ||
      inputMap[i][j] === "^" ||
      mapPartOne[i][j] === "."
    ) {
      continue;
    }

    const mapWithObstruction = inputMap.map((row) => [...row]);
    mapWithObstruction[i][j] = "#";

    const { isInfiniteLoop } = calcPath(mapWithObstruction);
    if (isInfiniteLoop) obstructionPathsNb++;
  }
}
console.log("Part two answer", obstructionPathsNb);
