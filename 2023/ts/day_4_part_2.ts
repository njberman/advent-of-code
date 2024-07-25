import fs from "fs";
import util from "util";

interface Card {
  index: number;
  winningNumbers: number[];
  yourNumbers: number[];
}

interface Node {
  val: number;
  left?: Node;
  right?: Node;
}

const file = fs.readFileSync("./test.txt");
const lines = String(file).split("\n").slice(0, -1);

const cards: Card[] = [];

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

  cards.push({ winningNumbers, yourNumbers, index: lines.indexOf(line) });
}

const processed: number[] = [];
function process(card: Card, cards: Card[], count: number = 0) {
  const matching = countMatching(card);
  if (matching === 0 || cards.indexOf(card) === cards.length - 1) return 1;

  for (let i = 0; i < matching; i++) {
    if (cards.indexOf(card) + i + 1 >= cards.length) break;
    processed.push(cards.indexOf(card) + i + 2);
    count += process(cards[cards.indexOf(card) + i + 1], cards, count);
  }

  return count;
}

console.log(process(cards[0], cards), processed);
// function generateTree(node: Node, cards: Card[], matchingLeft: number): Node {
//   if (node.val === cards.length || matchingLeft === 0) return node;
//   const card = cards[node.val - 1];
//
//   const matching = countMatching(card);
//   if (matching === 0) return node;
//
//   if (node.left) node.right = generateTree(node.left, cards, matching - 1);
//   else node.left = generateTree(node, cards, matching - 1);
//   return node;
// }

// function generateTree(card: Card, cards: Card[], lastMatching: number): Node {
//   const root: Node = { val: cards.indexOf(card) + 1 };
//   if (lastMatching === 0) return root;
//
//   root.right = generateTree(
//     cards[cards.indexOf(card) + 1],
//     cards,
//     lastMatching - 1,
//   );
//
//   const matching = countMatching(card);
//   if (matching === 0 || cards.indexOf(card) === cards.length - 1) return root;
//
//   root.left = generateTree(cards[cards.indexOf(card) + 1], cards, matching - 1);
//   return root;
// }

function countMatching(card: Card): number {
  return card.yourNumbers.reduce(
    (acc, el) => (card.winningNumbers.includes(el) ? acc + 1 : acc),
    0,
  );
}

// console.log(
//   util.inspect(
//     generateTree(
//       {
//         val: 1,
//         left: {
//           val: 2,
//           left: {
//             val: 3,
//             left: { val: 4, left: { val: 5, left: { val: 6 } } },
//           },
//         },
//       },
//       cards,
//     ),
//     false,
//     null,
//     true,
//   ),
// );
