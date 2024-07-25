import fs from "fs";

const file = String(fs.readFileSync("./day_4_input.txt"));

let sum = 0;
for (const line of file.split("\n").slice(0, -1)) {
  const numbers = line.split(": ")[1];

  const winningNumbers = numbers
    .split(" | ")[0]
    .split(" ")
    .filter((s) => s !== "")
    .map((n) => parseInt(n));
  const yourNumbers = numbers
    .split(" | ")[1]
    .split(" ")
    .filter((s) => s !== "")
    .map((n) => parseInt(n));

  let points = 0;
  for (const yourNumber of yourNumbers) {
    if (winningNumbers.includes(yourNumber)) {
      if (points === 0) points++;
      else points *= 2;
    }
  }

  sum += points;
}

console.log(sum);
