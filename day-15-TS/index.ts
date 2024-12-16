import { rawInput } from "./input";

// Format inputs

const map = rawInput
  .split("\n\n")[0]
  .split("\n")
  .map((row) => row.split(""));

const moves = rawInput.split("\n\n")[1].split("\n").join("");

// Shared functions
type Coordinate = [number, number];

const getRobotPosition = (map: string[][]): Coordinate => {
  const i = map.findIndex((row) => row.includes("@"));
  const j = map[i].indexOf("@");
  return [i, j];
};

const getNextTileFn = (move: string): ((pos: Coordinate) => Coordinate) => {
  switch (move) {
    case "^":
      return (pos: Coordinate) => [pos[0] - 1, pos[1]];
    case "v":
      return (pos: Coordinate) => [pos[0] + 1, pos[1]];
    case ">":
      return (pos: Coordinate) => [pos[0], pos[1] + 1];
    case "<":
      return (pos: Coordinate) => [pos[0], pos[1] - 1];
    default:
      throw new Error("Invalid move");
  }
};

const calcBoxGps = (map: string[][], boxToken = "O"): number =>
  map.reduce(
    (acc, row, i) =>
      acc +
      row.reduce((prev, val, j) => {
        if (val === boxToken) return prev + 100 * i + j;
        return prev;
      }, 0),
    0
  );

const getMapAfterMoves = (
  inputMap: string[][],
  moves: string,
  makeMove: (
    map: string[][],
    getNextTile: (pos: Coordinate) => Coordinate,
    coordinates: Coordinate,
    value: string
  ) => void
): string[][] => {
  const map = inputMap.map((row) => [...row]);

  for (const move of moves) {
    const robotPosition = getRobotPosition(map);
    const getNextTile = getNextTileFn(move);
    const nextPosition = getNextTile(robotPosition);

    try {
      const mapCopy = map.map((row) => [...row]);
      makeMove(mapCopy, getNextTile, nextPosition, "@");
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "Invalid move") continue;
      throw e;
    }

    makeMove(map, getNextTile, nextPosition, "@");
    map[robotPosition[0]][robotPosition[1]] = ".";
  }

  return map;
};

// Part 1
const makeMovePartOne = (
  map: string[][],
  getNextTile: (pos: Coordinate) => Coordinate,
  coordinates: Coordinate,
  value: string
) => {
  const nextCoordinates = getNextTile(coordinates);
  const tile = map[coordinates[0]][coordinates[1]];
  switch (tile) {
    case "#":
      throw new Error("Invalid move");
    case ".":
      map[coordinates[0]][coordinates[1]] = value;
      return;
    case "O":
      map[coordinates[0]][coordinates[1]] = value;
      makeMovePartOne(map, getNextTile, nextCoordinates, tile);
      return;
    default:
      throw new Error("Invalid tile");
  }
};
const partOneMap = getMapAfterMoves(map, moves, makeMovePartOne);
console.log("Part one answer", calcBoxGps(partOneMap));

// Part 2
const scaledMap = map.map((row) =>
  row.flatMap((tile) => {
    switch (tile) {
      case "#":
        return ["#", "#"];
      case "O":
        return ["[", "]"];
      case ".":
        return [".", "."];
      case "@":
        return ["@", "."];
      default:
        throw new Error("Invalid tile");
    }
  })
);

const makeMovePartTwo = (
  map: string[][],
  getNextTile: (pos: Coordinate) => Coordinate,
  coordinates: Coordinate,
  value: string
) => {
  const nextCoordinates = getNextTile(coordinates);
  const tile = map[coordinates[0]][coordinates[1]];
  switch (tile) {
    case "#":
      throw new Error("Invalid move");
    case ".":
      map[coordinates[0]][coordinates[1]] = value;
      return;
    case "[":
      map[coordinates[0]][coordinates[1]] = value;
      makeMovePartTwo(map, getNextTile, nextCoordinates, tile);

      if (getNextTile([0, 0])[0] === 0) return;

      map[coordinates[0]][coordinates[1] + 1] = ".";
      makeMovePartTwo(
        map,
        getNextTile,
        [nextCoordinates[0], nextCoordinates[1] + 1],
        "]"
      );
      return;
    case "]":
      map[coordinates[0]][coordinates[1]] = value;
      makeMovePartTwo(map, getNextTile, nextCoordinates, tile);

      if (getNextTile([0, 0])[0] === 0) return;

      map[coordinates[0]][coordinates[1] - 1] = ".";
      makeMovePartTwo(
        map,
        getNextTile,
        [nextCoordinates[0], nextCoordinates[1] - 1],
        "["
      );
      return;
    default:
      throw new Error("Invalid tile");
  }
};

const partTwoMap = getMapAfterMoves(scaledMap, moves, makeMovePartTwo);
console.log("Part two answer", calcBoxGps(partTwoMap, "["));
