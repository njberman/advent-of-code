import fs from "fs";

let lines = fs.readFileSync("./day_5_input.txt").toString().split("\n\n");

const seedsIds = lines[0]
  .slice(7)
  .split(" ")
  .map((s) => parseInt(s));

const givenMaps = lines.splice(1).filter((s) => s !== "");

const maps: { [mapName: string]: { [id: number]: number } } = {};

for (const givenMap of givenMaps) {
  const splitGivenMap = givenMap.split("\n").filter((s) => s !== "");
  const mapName = splitGivenMap[0].split(" ")[0].split("-to-").join("-");

  const currentMap: { [id: number]: number } = {};

  for (const map of splitGivenMap.slice(1)) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = map
      .split(" ")
      .map((s) => parseInt(s));

    for (let i = 0; i < rangeLength; i++) {
      currentMap[sourceRangeStart + i] = destinationRangeStart + i;
    }
  }

  maps[mapName] = currentMap;
}

let nextIds = seedsIds.slice();
for (const mapKey in maps) {
  const currentMap = maps[mapKey];
  const newIds: number[] = [];
  for (const id of nextIds) {
    if (currentMap) {
      let newId = currentMap[id];
      if (!newId) newId = id;
      newIds.push(newId);
    }
  }
  nextIds = newIds.slice();
}

const lowestLocationId = Math.min(...nextIds);
console.log(lowestLocationId);
