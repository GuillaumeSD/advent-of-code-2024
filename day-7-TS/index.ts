import { rawInput } from "./input";

// Format inputs
const input = rawInput.split("\n").map((row) => [
  parseInt(row.split(": ")[0]),
  ...row
    .split(": ")[1]
    .split(" ")
    .map((nb) => parseInt(nb)),
]);

// Shared functions
type Operands = ((a: number, b: number) => number)[];

const isValidStep = (
  values: number[],
  testValue: number,
  operands: Operands,
  valueUntil = values[0],
  currentIdx = 0
): boolean => {
  const nextIdx = currentIdx + 1;

  for (const operand of operands) {
    const newValue = operand(valueUntil, values[nextIdx]);

    if (nextIdx === values.length - 1 && newValue === testValue) return true;

    if (
      nextIdx < values.length - 1 &&
      isValidStep(values, testValue, operands, newValue, nextIdx)
    ) {
      return true;
    }
  }

  return false;
};

const isValidEquation = (numbers: number[], operands: Operands): boolean => {
  const [testValue, ...values] = numbers;
  return isValidStep(values, testValue, operands);
};

const calcResult = (equations: number[][]): number =>
  equations.reduce((sum, equation) => sum + equation[0], 0);

// Part 1
const partOneOperands = [
  (a: number, b: number): number => a + b,
  (a: number, b: number): number => a * b,
];

const partOneValidEquations = input.filter((equation) =>
  isValidEquation(equation, partOneOperands)
);

const partOneAnswer = calcResult(partOneValidEquations);
console.log("Part one answer", partOneAnswer);

// Part 2
const partTwoOperands = [
  (a: number, b: number): number => a + b,
  (a: number, b: number): number => a * b,
  (a: number, b: number): number => parseInt(`${a}${b}`),
];

const partTwoValidEquations = input.filter((equation) =>
  isValidEquation(equation, partTwoOperands)
);

const partTwoAnswer = calcResult(partTwoValidEquations);
console.log("Part two answer", partTwoAnswer);
