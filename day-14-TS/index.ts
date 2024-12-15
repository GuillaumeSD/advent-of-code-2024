import { rawInput } from "./input";

// Format inputs
interface Robot {
  position: { x: number; y: number };
  speed: { x: number; y: number };
}

const robots: Robot[] = rawInput.split("\n").map((line) => {
  const digits = line.match(/-?\d+/g);
  if (!digits || digits.length !== 4) throw new Error("regex error");
  const parsedDigits = digits.map(Number);
  return {
    position: { x: parsedDigits[0], y: parsedDigits[1] },
    speed: { x: parsedDigits[2], y: parsedDigits[3] },
  };
});

const GRID_X = 101;
const GRID_Y = 103;

// Shared functions
const getSafetyFactor = (robots: Robot[]): number => {
  const middleX = Math.floor(GRID_X / 2);
  const middleY = Math.floor(GRID_Y / 2);

  const robotsInEachQuadrant = robots.reduce(
    (acc, robot) => {
      const newAcc = [...acc];
      if (robot.position.x > middleX) {
        if (robot.position.y > middleY) {
          newAcc[3]++;
        } else if (robot.position.y < middleY) {
          newAcc[1]++;
        }
      } else if (robot.position.x < middleX) {
        if (robot.position.y > middleY) {
          newAcc[2]++;
        } else if (robot.position.y < middleY) {
          newAcc[0]++;
        }
      }

      return newAcc;
    },
    [0, 0, 0, 0]
  );

  return (
    robotsInEachQuadrant[0] *
    robotsInEachQuadrant[1] *
    robotsInEachQuadrant[2] *
    robotsInEachQuadrant[3]
  );
};

const getRobotPosition = (robot: Robot, iterations: number): Robot => {
  const { position, speed } = robot;

  let positionX = position.x + speed.x * iterations;
  let positionY = position.y + speed.y * iterations;

  positionX = positionX % GRID_X;
  if (positionX === -0) positionX = 0;
  if (positionX < 0) positionX += GRID_X;

  positionY = positionY % GRID_Y;
  if (positionY === -0) positionY = 0;
  if (positionY < 0) positionY += GRID_Y;

  return {
    position: { x: positionX, y: positionY },
    speed,
  };
};

const getRobotsPositions = (robots: Robot[], iterations: number): Robot[] => {
  return robots.map((robot) => getRobotPosition(robot, iterations));
};

const logGrid = (robots: Robot[]) => {
  console.log(
    Array(GRID_Y)
      .fill(0)
      .map((_, idx) => {
        const row = [];
        for (let i = 0; i < GRID_X; i++) {
          const robotsNb = robots.filter(
            (robot) => robot.position.x === i && robot.position.y === idx
          );
          row.push(robotsNb.length || ".");
        }
        return row.join("");
      })
      .join("\n")
  );
};

const areAllRobotsNotOnSameTile = (robots: Robot[]): boolean => {
  const robotsPositions = robots.map(
    (robot) => `${robot.position.x},${robot.position.y}`
  );
  return new Set(robotsPositions).size === robotsPositions.length;
};

// Part 1
const partOnePositions = getRobotsPositions(robots, 100);
console.log("Part one answer", getSafetyFactor(partOnePositions));

// Part 2
for (let i = 1; i < 100_000; i++) {
  const robotsPositions = getRobotsPositions(robots, i);
  if (areAllRobotsNotOnSameTile(robotsPositions)) {
    logGrid(robotsPositions);
    console.log("Part two answer", i);
    break;
  }
}
