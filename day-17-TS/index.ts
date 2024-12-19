import { rawInput } from "./input";

// Format inputs
const input = rawInput.match(/(\d+)/g);
if (!input) throw new Error("Invalid input");

type bigInt = bigint;
const registerA: bigint = BigInt(input[0]);
const registerB: bigint = BigInt(input[1]);
const registerC: bigint = BigInt(input[2]);

const program: bigint[] = input.slice(3).map((digit) => BigInt(digit));

// Shared functions
const getComboOperand = (
  operand: bigint,
  registerA: bigInt,
  registerB: bigInt,
  registerC: bigInt
): bigInt => {
  switch (operand) {
    case 0n:
    case 1n:
    case 2n:
    case 3n:
      return operand;
    case 4n:
      return registerA;
    case 5n:
      return registerB;
    case 6n:
      return registerC;
    default:
      throw new Error("Invalid operand");
  }
};

const getProgramOutput = (
  program: bigInt[],
  inputRegisterA: bigInt,
  inputRegisterB: bigInt,
  inputRegisterC: bigInt,
  outputsTarget?: bigInt[]
): bigInt[] => {
  let registerA = inputRegisterA;
  let registerB = inputRegisterB;
  let registerC = inputRegisterC;

  const outputs: bigInt[] = [];
  let instructionPointer = 0;

  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    const comboOperand = getComboOperand(
      operand,
      registerA,
      registerB,
      registerC
    );

    switch (opcode) {
      case 0n:
        registerA = registerA / 2n ** comboOperand;
        break;
      case 1n:
        registerB = registerB ^ operand;
        break;
      case 2n:
        registerB = comboOperand % 8n;
        break;
      case 3n:
        if (registerA === 0n) break;
        instructionPointer = Number(operand);
        continue;
      case 4n:
        registerB = registerB ^ registerC;
        break;
      case 5n:
        outputs.push(comboOperand % 8n);

        if (outputsTarget) {
          if (outputs.length > outputsTarget.length) return [];
          if (
            outputs[outputs.length - 1] !== outputsTarget[outputs.length - 1]
          ) {
            return [];
          }
        }
        break;
      case 6n:
        registerB = registerA / 2n ** comboOperand;
        break;
      case 7n:
        registerC = registerA / 2n ** comboOperand;
        break;
      default:
        throw new Error("Invalid opcode");
    }

    instructionPointer += 2;
  }

  return outputs;
};

// Part 1

console.log(
  "Part one answer",
  getProgramOutput(program, registerA, registerB, registerC).join(",")
);

// Part 2 (brute force, not working)
const areProgramsEqual = (program1: bigInt[], program2: bigInt[]): boolean => {
  if (program1.length !== program2.length) return false;

  for (let i = 0; i < program1.length; i++) {
    if (program1[i] !== program2[i]) return false;
  }

  return true;
};

const registerAMin = 8n ** 15n;
const registerAMax = 8n ** 16n;
let registerAPart2 = registerAMin - 1n;
let outputsPart2: bigInt[] = [];
while (!areProgramsEqual(program, outputsPart2)) {
  registerAPart2++;

  if (registerAPart2 > registerAMax) {
    throw new Error("registerAPart2 exceeded max");
  }

  outputsPart2 = getProgramOutput(
    program,
    registerAPart2,
    registerB,
    registerC
  );
}

console.log("Part two answer", registerAPart2);
