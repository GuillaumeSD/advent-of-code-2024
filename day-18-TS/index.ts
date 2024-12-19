import { rawInput } from "./input";

// Format inputs
type Coordinates = [number, number];

const MAP_SIZE = 71;

const input: Coordinates[] = rawInput.split("\n").map((line) => {
  const [x, y] = line.split(",");
  return [parseInt(x), parseInt(y)];
});

// Shared functions
const getMapAfterNBytes = (input: Coordinates[], n: number): string[][] => {
  const map = Array(MAP_SIZE)
    .fill(null)
    .map(() => Array(MAP_SIZE).fill("."));

  for (let i = 0; i < n; i++) {
    const [x, y] = input[i];
    map[y][x] = "#";
  }

  return map;
};

const getMinimumStepsToExit = (inputMap: string[][]): number => {
  const map = inputMap.map((row) => [...row]);
  let steps = 0;
  let pathHeads: Coordinates[] = [[0, 0]];
  map[0][0] = "X";

  while (pathHeads.length) {
    const newPathHeads: Coordinates[] = [];

    for (const pathHead of pathHeads) {
      const [x, y] = pathHead;

      if (x === MAP_SIZE - 1 && y === MAP_SIZE - 1) {
        return steps;
      }

      if (x + 1 < MAP_SIZE && map[y][x + 1] === ".") {
        newPathHeads.push([x + 1, y]);
        map[y][x + 1] = "X";
      }

      if (y + 1 < MAP_SIZE && map[y + 1][x] === ".") {
        newPathHeads.push([x, y + 1]);
        map[y + 1][x] = "X";
      }

      if (x - 1 >= 0 && map[y][x - 1] === ".") {
        newPathHeads.push([x - 1, y]);
        map[y][x - 1] = "X";
      }

      if (y - 1 >= 0 && map[y - 1][x] === ".") {
        newPathHeads.push([x, y - 1]);
        map[y - 1][x] = "X";
      }
    }

    pathHeads = newPathHeads;
    steps++;
  }

  return -1;
};

// Part 1
const partOneMap = getMapAfterNBytes(input, 1024);
console.log("Part one answer", getMinimumStepsToExit(partOneMap));

// Part 2
const map = getMapAfterNBytes(input, 0);
for (let i = 1025; i < input.length; i++) {
  const [x, y] = input[i];
  map[y][x] = "#";

  const steps = getMinimumStepsToExit(map);
  if (steps === -1) {
    console.log("Part two answer", input[i].join(","));
    break;
  }
}
