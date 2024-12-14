import { rawInput } from "./input";

// Format inputs
interface Machine {
  buttonA: { x: number; y: number };
  buttonB: { x: number; y: number };
  prize: { x: number; y: number };
}

const machines: Machine[] = rawInput.split("\n\n").map((machine) => {
  const [buttonA, buttonB, prize] = machine.split("\n").map((line) => {
    const digits = line.match(/\d+/g);
    if (!digits) throw new Error("regex error");
    const [x, y] = digits.map(Number);
    return { x, y };
  });

  return { buttonA, buttonB, prize };
});

// Shared functions
const getMachineSolution = (
  machine: Machine
): { buttonA: number; buttonB: number }[] => {
  const { buttonA, buttonB, prize } = machine;
  const det = buttonA.x * buttonB.y - buttonA.y * buttonB.x;
  const aDet = prize.x * buttonB.y - buttonB.x * prize.y;
  const bDet = buttonA.x * prize.y - prize.x * buttonA.y;

  if (det === 0 || aDet % det !== 0 || bDet % det !== 0) {
    return [];
  }

  const a = aDet / det;
  const b = bDet / det;

  if (a < 0 || b < 0) {
    return [];
  }

  return [{ buttonA: a, buttonB: b }];
};

const getFewestTokensToWin = (machine: Machine): number => {
  const solutions = getMachineSolution(machine);
  if (solutions.length === 0) return 0;

  return Math.min(
    ...solutions.map((solution) => solution.buttonA * 3 + solution.buttonB)
  );
};

const getAllFewestTokensToWin = (machines: Machine[]): number =>
  machines.reduce((acc, machine) => acc + getFewestTokensToWin(machine), 0);

// Part 1
console.log("Part one answer", getAllFewestTokensToWin(machines));

// Part 2
const machinesPartTwo = machines.map((machine) => ({
  ...machine,
  prize: {
    x: machine.prize.x + 10000000000000,
    y: machine.prize.y + 10000000000000,
  },
}));
console.log("Part two answer", getAllFewestTokensToWin(machinesPartTwo));
