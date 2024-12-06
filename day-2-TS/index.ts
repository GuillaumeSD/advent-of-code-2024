import { rawInput } from "./input";

const rawInputLines = rawInput.split("\n");

const reports = rawInputLines.map((line) =>
  line.split(" ").map((num) => parseInt(num))
);

// Part 1
const isReportLevelSafe =
  (order: "asc" | "desc") =>
  (level: number, index: number, report: number[]): boolean => {
    if (index === 0) return true;

    const isOrderSafe =
      order === "desc" ? level < report[index - 1] : level > report[index - 1];
    if (!isOrderSafe) return false;

    const isDiffSafe = Math.abs(level - report[index - 1]) <= 3;
    return isDiffSafe;
  };

const getReportOrder = (report: number[]): "asc" | "desc" =>
  report[0] - report[1] > 0 ? "desc" : "asc";

const isReportSafe = (report: number[]): boolean => {
  const order = getReportOrder(report);
  return report.every(isReportLevelSafe(order));
};

const safeReportsPart1 = reports.filter(isReportSafe);
console.log("number of safe reports", safeReportsPart1.length);

// Part 2
const safeReportsPart2 = reports.filter((report) => {
  const order = getReportOrder(report);

  for (let i = 1; i < report.length; i++) {
    if (isReportLevelSafe(order)(report[i], i, report)) continue;

    if (isReportSafe(report.toSpliced(i, 1))) return true;
    if (isReportSafe(report.toSpliced(i - 1, 1))) return true;
    if (i !== 1 && isReportSafe(report.toSpliced(0, 1))) return true;
    if (i > 2 && isReportSafe(report.toSpliced(1, 1))) return true;

    return false;
  }

  return true;
});
console.log("number of part 2 safe reports", safeReportsPart2.length);
