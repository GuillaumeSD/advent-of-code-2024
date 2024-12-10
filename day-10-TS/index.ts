import { rawInput } from "./input";

// Format inputs
const map = rawInput
  .split("\n")
  .map((line) => line.split("").map((digit) => parseInt(digit)));

// Shared functions
type Tile = { i: number; j: number };
type TrailHead = { trailhead: Tile; trailEnds: Tile[] };

const removeDuplicateTiles = (tiles: Tile[]) =>
  tiles.filter(
    (tile, index) =>
      tiles.findIndex((t) => t.i === tile.i && t.j === tile.j) === index
  );

const getTrailEnds = (map: number[][], i: number, j: number): Tile[] => {
  const tileHeight = map[i][j];
  if (tileHeight === 9) return [{ i, j }];

  const trailEnds: Tile[] = [];

  if (i > 0 && map[i - 1][j] === tileHeight + 1) {
    const endTiles = getTrailEnds(map, i - 1, j);
    trailEnds.push(...endTiles);
  }

  if (j > 0 && map[i][j - 1] === tileHeight + 1) {
    const endTiles = getTrailEnds(map, i, j - 1);
    trailEnds.push(...endTiles);
  }

  if (i + 1 < map.length && map[i + 1][j] === tileHeight + 1) {
    const endTiles = getTrailEnds(map, i + 1, j);
    trailEnds.push(...endTiles);
  }

  if (j + 1 < map[i].length && map[i][j + 1] === tileHeight + 1) {
    const endTiles = getTrailEnds(map, i, j + 1);
    trailEnds.push(...endTiles);
  }

  return trailEnds;
};

const getTrailHeads = (map: number[][]): TrailHead[] => {
  const trailHeads: TrailHead[] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== 0) continue;

      const trailEnds = getTrailEnds(map, i, j);
      trailHeads.push({ trailhead: { i, j }, trailEnds });
    }
  }

  return trailHeads;
};

// Part 1
const trails = getTrailHeads(map);
const partOneScore = trails.reduce(
  (sum, trailhead) => sum + removeDuplicateTiles(trailhead.trailEnds).length,
  0
);
console.log("Part one answer", partOneScore);

// Part 2
const partTwoScore = trails.reduce(
  (sum, trailhead) => sum + trailhead.trailEnds.length,
  0
);
console.log("Part two answer", partTwoScore);
