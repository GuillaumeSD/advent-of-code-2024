import { rawInput } from "./input";

// Format inputs
type Coordinates = [number, number];
type Map = string[][];
type MapWithInfo = (string | number)[][];
interface Shortcut {
  steps: number;
  start: Coordinates;
  end: Coordinates;
}

const inputMap: Map = rawInput.split("\n").map((line) => line.split(""));

// Shared functions
const getStartingCoordinates = (inputMap: Map): Coordinates => {
  const i = inputMap.findIndex((row) => row.includes("S"));
  const j = inputMap[i].indexOf("S");
  return [i, j];
};

const getMapWithPathInfo = (
  inputMap: string[][],
  startingCoordinates: Coordinates
): { map: MapWithInfo; steps: number } => {
  const map: MapWithInfo = inputMap.map((row) => [...row]);
  let steps = 0;
  let pathHeads: Coordinates[] = [startingCoordinates];
  map[startingCoordinates[0]][startingCoordinates[1]] = 0;

  while (pathHeads.length) {
    const newPathHeads: Coordinates[] = [];

    for (const pathHead of pathHeads) {
      const [i, j] = pathHead;
      steps++;

      if (inputMap[i][j + 1] === "E") {
        map[i][j + 1] = steps;
        return { map, steps };
      }

      if (inputMap[i][j - 1] === "E") {
        map[i][j - 1] = steps;
        return { map, steps };
      }

      if (inputMap[i + 1][j] === "E") {
        map[i + 1][j] = steps;
        return { map, steps };
      }

      if (inputMap[i - 1][j] === "E") {
        map[i - 1][j] = steps;
        return { map, steps };
      }

      if (map[i][j + 1] === ".") {
        newPathHeads.push([i, j + 1]);
        map[i][j + 1] = steps;
      }

      if (map[i + 1][j] === ".") {
        newPathHeads.push([i + 1, j]);
        map[i + 1][j] = steps;
      }

      if (map[i][j - 1] === ".") {
        newPathHeads.push([i, j - 1]);
        map[i][j - 1] = steps;
      }

      if (map[i - 1][j] === ".") {
        newPathHeads.push([i - 1, j]);
        map[i - 1][j] = steps;
      }
    }

    pathHeads = newPathHeads;
  }

  return { map, steps: -1 };
};

const getAllNextCoordinates = (coordinates: Coordinates): Coordinates[] => {
  const output: Coordinates[] = [];

  if (coordinates[0] + 1 < inputMap.length) {
    output.push([coordinates[0] + 1, coordinates[1]]);
  }

  if (coordinates[0] - 1 >= 0) {
    output.push([coordinates[0] - 1, coordinates[1]]);
  }

  if (coordinates[1] + 1 < inputMap[coordinates[0]].length) {
    output.push([coordinates[0], coordinates[1] + 1]);
  }

  if (coordinates[1] - 1 >= 0) {
    output.push([coordinates[0], coordinates[1] - 1]);
  }

  return output;
};

const getAllDirections = (
  coordinates: Coordinates,
  maxStepsAllowed: number
): Coordinates[] => {
  const output: Coordinates[] = [...getAllNextCoordinates(coordinates)];

  for (let n = 1; n < maxStepsAllowed; n++) {
    for (const coord of output.slice()) {
      const nextTiles = getAllNextCoordinates(coord);
      output.push(
        ...nextTiles.filter(
          (t) => !output.some((o) => o[0] === t[0] && o[1] === t[1])
        )
      );
    }
  }

  return output;
};

const getAllShortcuts = (
  map: MapWithInfo,
  maxStepsAllowed: number
): Shortcut[] => {
  const shortcuts: Shortcut[] = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const startingTile = map[i][j];
      if (typeof startingTile !== "number") continue;

      const nextTiles = getAllDirections([i, j], maxStepsAllowed);
      for (const [nextI, nextJ] of nextTiles) {
        if (typeof map[nextI][nextJ] !== "number") continue;

        const steps =
          map[nextI][nextJ] -
          startingTile -
          Math.abs(nextI - i) -
          Math.abs(nextJ - j);
        if (steps <= 0) continue;

        shortcuts.push({ steps, start: [i, j], end: [nextI, nextJ] });
      }
    }
  }

  return shortcuts;
};

// Part 1
const startingCoordinates = getStartingCoordinates(inputMap);
const { steps, map: mapWithInfo } = getMapWithPathInfo(
  inputMap,
  startingCoordinates
);
if (steps === -1) throw new Error("No path to exit found");
console.log("Fastest time", steps);

const shortcutsPartOne = getAllShortcuts(mapWithInfo, 2);
console.log(
  "Part one answer",
  shortcutsPartOne.filter((s) => s.steps >= 100).length
);

// Part 2
const shortcutsPartTwo = getAllShortcuts(mapWithInfo, 20);
console.log(
  "Part two answer",
  shortcutsPartTwo.filter((s) => s.steps >= 100).length
);
