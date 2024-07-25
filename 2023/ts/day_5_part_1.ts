import fs from "fs";

let lines = fs.readFileSync("./test-input.txt").toString().split("\n\n");

const seedsIds = lines[0]
  .slice(7)
  .split(" ")
  .map((s) => parseInt(s));

const givenMaps = lines.splice(1).filter((s) => s !== "");

// const map: { [mapName: string]:  } = [];

for (const givenMap of givenMaps) {
  const [sourceCategory, destinationCategory] = givenMap
    .split("\n")[0]
    .split(" ")[0]
    .split("-to-");

  // const destinationRangeStart
}
