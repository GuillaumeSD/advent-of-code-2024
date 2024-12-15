import { rawInput } from "./input";

// Format inputs
const map = rawInput.split("\n");

// Shared functions
type Coordinates = [number, number];
interface Region {
  coordinates: Coordinates[];
}

const getAdjacentPlots = (i: number, j: number): Coordinates[] => {
  const coordinates: Coordinates[] = [];
  const letter = map[i][j];

  if (i > 0 && map[i - 1][j] === letter) {
    coordinates.push([i - 1, j]);
  }

  if (j > 0 && map[i][j - 1] === letter) {
    coordinates.push([i, j - 1]);
  }

  if (i < map.length - 1 && map[i + 1][j] === letter) {
    coordinates.push([i + 1, j]);
  }

  if (j < map[i].length - 1 && map[i][j + 1] === letter) {
    coordinates.push([i, j + 1]);
  }

  return coordinates;
};

const getRegion = (i: number, j: number): Region => {
  const region: Region = {
    coordinates: [[i, j]],
  };

  let newPlots: Coordinates[];

  do {
    newPlots = [];
    for (const [i, j] of region.coordinates) {
      const adjacentPlots = getAdjacentPlots(i, j);
      for (const [i, j] of adjacentPlots) {
        if (
          !region.coordinates.some((coord) => coord[0] === i && coord[1] === j)
        ) {
          region.coordinates.push([i, j]);
          newPlots.push([i, j]);
        }
      }
    }
  } while (newPlots.length > 0);

  return region;
};

const getRegionArea = (region: Region): number => region.coordinates.length;

// Part 1
const regions: Region[] = [];
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const region = getRegion(i, j);
    if (
      !regions.some((reg) =>
        region.coordinates.some(
          (newCoord) =>
            newCoord[0] === reg.coordinates[0][0] &&
            newCoord[1] === reg.coordinates[0][1]
        )
      )
    ) {
      regions.push(region);
    }
  }
}

const getRegionPerimeter = (region: Region): number =>
  region.coordinates.reduce((acc, [i, j]) => {
    const adjacentPlots = getAdjacentPlots(i, j);
    return acc + 4 - adjacentPlots.length;
  }, 0);

const getMapPartOnePrice = (regions: Region[]): number =>
  regions.reduce(
    (acc, region) => acc + getRegionArea(region) * getRegionPerimeter(region),
    0
  );

console.log("Part one answer", getMapPartOnePrice(regions));

// Part 2
const getRegionSides = (region: Region): number => {
  const arr = [];
  for (const [i, j] of region.coordinates) {
    const adjacentPlots = getAdjacentPlots(i, j);
    if (adjacentPlots.length === 4) continue;

    if (!region.coordinates.some(([k, m]) => k === i && m === j + 1)) {
      arr.push({ coordinates: [i, j], orientation: "right" });
    }
    if (!region.coordinates.some(([k, m]) => k === i && m === j - 1)) {
      arr.push({ coordinates: [i, j], orientation: "left" });
    }
    if (!region.coordinates.some(([k, m]) => k === i + 1 && m === j)) {
      arr.push({ coordinates: [i, j], orientation: "down" });
    }
    if (!region.coordinates.some(([k, m]) => k === i - 1 && m === j)) {
      arr.push({ coordinates: [i, j], orientation: "up" });
    }
  }

  for (let y = 0; y < 2; y++) {
    let currentIdx = 0;
    while (currentIdx < arr.length) {
      const { coordinates, orientation } = arr[currentIdx];
      const [i, j] = coordinates;

      if (orientation === "right" || orientation === "left") {
        let nextI = i;
        do {
          const nextIdx = arr.findIndex(
            (item) =>
              item.orientation === orientation &&
              item.coordinates[1] === j &&
              item.coordinates[0] !== i &&
              Math.abs(item.coordinates[0] - nextI) === 1
          );

          if (nextIdx !== -1) {
            nextI = arr[nextIdx].coordinates[0];
            arr.splice(nextIdx, 1);
          } else {
            nextI = -1;
          }
        } while (nextI !== -1);
      } else if (orientation === "down" || orientation === "up") {
        let nextJ = j;
        do {
          const nextIdx = arr.findIndex(
            (item) =>
              item.orientation === orientation &&
              item.coordinates[0] === i &&
              item.coordinates[1] !== j &&
              Math.abs(item.coordinates[1] - nextJ) === 1
          );

          if (nextIdx !== -1) {
            nextJ = arr[nextIdx].coordinates[1];
            arr.splice(nextIdx, 1);
          } else {
            nextJ = -1;
          }
        } while (nextJ !== -1);
      }
      currentIdx++;
    }
  }

  return arr.length;
};

const getMapPartTwoPrice = (regions: Region[]): number =>
  regions.reduce(
    (acc, region) => acc + getRegionArea(region) * getRegionSides(region),
    0
  );

console.log("Part two answer", getMapPartTwoPrice(regions));
