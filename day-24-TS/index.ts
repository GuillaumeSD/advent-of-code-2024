import { rawInput } from "./input";

// Format inputs
type Gates = Partial<Record<string, number>>;
interface Instruction {
  gateA: string;
  operand: string;
  gateB: string;
  resultGate: string;
}

const initialValues: Gates = rawInput
  .split("\n\n")[0]
  .split("\n")
  .reduce<Gates>((acc, line) => {
    const [gate, value] = line.split(": ");
    acc[gate] = parseInt(value);
    return acc;
  }, {});

const instructions: Instruction[] = rawInput
  .split("\n\n")[1]
  .split("\n")
  .map((line) => {
    const [gateA, operand, gateB, _, resultGate] = line.split(" ");
    return { gateA, operand, gateB, resultGate };
  });

// Shared functions
const getInstructionResult = (
  instruction: Instruction,
  gates: Gates
): number => {
  const gateA = gates[instruction.gateA];
  if (gateA === undefined) {
    throw new Error("Gate A is not defined");
  }

  const gateB = gates[instruction.gateB];
  if (gateB === undefined) {
    throw new Error("Gate B is not defined");
  }

  switch (instruction.operand) {
    case "AND":
      return gateA && gateB;
    case "OR":
      return gateA || gateB;
    case "XOR":
      return gateA !== gateB ? 1 : 0;
    default:
      throw new Error("Invalid operand");
  }
};

const getGatesFinalValues = (
  initialValues: Gates,
  inputInstructions: Instruction[]
) => {
  const gates = { ...initialValues };
  let instructions = [...inputInstructions];

  while (instructions.length) {
    const leftInstructions = [];
    for (const instruction of instructions) {
      const { gateA, gateB, resultGate } = instruction;
      if (gates[gateB] === undefined || gates[gateA] === undefined) {
        leftInstructions.push(instruction);
        continue;
      }

      const result = getInstructionResult(instruction, gates);
      gates[resultGate] = result;
    }

    instructions = leftInstructions;
  }

  return gates;
};

const getZNumber = (gatesEndValues: Gates): number => {
  const zGates = Object.keys(gatesEndValues)
    .filter((gate) => gate.startsWith("z"))
    .toSorted((a, b) => b.localeCompare(a))
    .map((gate) => gatesEndValues[gate]);

  return parseInt(zGates.join(""), 2);
};

// Part 1
const gatesEndValues = getGatesFinalValues(initialValues, instructions);
console.log("Part one answer", getZNumber(gatesEndValues));

// Part 2
console.log("Part two answer");
