import fs from "fs";

let lines = fs.readFileSync("./day_5_input.txt").toString().split("\n\n");

const seedsIds = lines[0]
  .slice(7)
  .split(" ")
  .map((s) => parseInt(s));

const givenMaps = lines.splice(1).filter((s) => s !== "");

const maps: {
  [mapName: string]: { source: number; destination: number; range: number }[];
} = {};

for (const givenMap of givenMaps) {
  const splitGivenMap = givenMap.split("\n").filter((s) => s !== "");
  const mapName = splitGivenMap[0].split(" ")[0].split("-to-").join("-");

  maps[mapName] = [];

  for (const map of splitGivenMap.slice(1)) {
    const [destination, source, range] = map.split(" ").map((s) => parseInt(s));

    maps[mapName].push({
      source,
      destination,
      range,
    });
  }
}

let nextIds = seedsIds.slice();
for (const mapName in maps) {
  const currentMap = maps[mapName];
  const newIds: number[] = [];
  for (const id of nextIds) {
    let newId = id;
    for (const map of currentMap) {
      const { source, destination, range } = map;

      if (source <= id && id < source + range) {
        newId = id - source + destination;
        break;
      }
    }
    newIds.push(newId);
  }
  nextIds = newIds.slice();
}

const lowestLocationId = Math.min(...nextIds);
console.log(lowestLocationId);
