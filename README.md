🎁🎄Welcome to Advent of Code 2024 !🎄🎁
==================

This repository contains my solutions to the [Advent of Code 2024](https://adventofcode.com/2024) challenges built with [Node.js](https://nodejs.org) and [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

## Running any day's solution locally

At least [Node.js](https://nodejs.org) 22.11 is required.

Install the dependencies :
```bash
npm i
```

Given X is the day number, change the `input.ts` file in the day-X-TS folder with the following content :
```typescript
export const input = `your day raw input here`;
```

Build :
```bash
npm run build
```

Given X is the day number :
```bash
npm run dayX
```

## Running any day's solution locally in dev mode

At least [Node.js](https://nodejs.org) 22.11 is required.

Install the dependencies :
```bash
npm i
```

Given X is the day number, change the `input.ts` file in the day-X-TS folder with the following content :
```typescript
export const input = `paste your day raw input here`;
```

Change accordingly the day number in the `npm run dev` script in the package.json file, then :
```bash
npm run dev
```

Your terminal ouput will automatically refresh on any source file change.
