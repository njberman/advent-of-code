import fs from "fs";
import util from "util";

interface Card {
  index: number;
  winningNumbers: number[];
  yourNumbers: number[];
  matching: number;
}

interface Node {
  val: number;
  left?: Node;
  right?: Node;
}

function countMatching(
  winningNumbers: number[],
  yourNumbers: number[],
): number {
  let count = 0;
  for (const n of yourNumbers) {
    if (winningNumbers.includes(n)) {
      count++;
    }
  }
  return count;
}

const file = fs.readFileSync("./day_4_input.txt");
const lines = String(file).split("\n").slice(0, -1);

const globalCards: Card[] = [];

for (const line of lines) {
  const [winningNumbers, yourNumbers] = line
    .split(": ")[1]
    .split(" | ")
    .map((ns) =>
      ns
        .split(" ")
        .filter((s) => s !== "")
        .map((n) => parseInt(n)),
    );

  globalCards.push({
    winningNumbers,
    yourNumbers,
    index: lines.indexOf(line),
    matching: countMatching(winningNumbers, yourNumbers),
  });
}

const allCards = Array.from({ length: globalCards.length }, () => 1);

for (let index = 0; index < globalCards.length; index++) {
  const card = globalCards[index];
  const { matching } = card;

  for (let i = 0; i < allCards[index]; i++) {
    const finalIndex = index + matching + 1;
    for (let newIndex = index + 1; newIndex < finalIndex; newIndex++) {
      allCards[newIndex]++;
    }
  }
}

console.log(allCards.reduce((acc, el) => acc + el));
