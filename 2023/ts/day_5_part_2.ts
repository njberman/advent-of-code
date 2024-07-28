import fs from "fs";

const startTime = performance.now();

let lines = fs.readFileSync("./day_5_input.txt").toString().split("\n\n");

const givenMaps = lines
  .slice()
  .splice(1)
  .filter((s) => s !== "");

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

function getSeedId(locationId: number): number {
  let nextIds = [locationId];
  for (const mapName of Object.keys(maps).reverse()) {
    const currentMap = maps[mapName];
    const newIds: number[] = [];
    for (const id of nextIds) {
      let newId = id;
      for (const map of currentMap) {
        const { source, destination, range } = map;

        if (destination <= id && id < destination + range) {
          newId = id - destination + source;
          break;
        }
      }
      newIds.push(newId);
    }
    nextIds = newIds.slice();
  }
  return nextIds[0];
}

function getLocationId(seedId: number): number {
  let nextIds = [seedId];
  for (const mapName of Object.keys(maps)) {
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
  return nextIds[0];
}

// console.log(0, getLocationId(0), getSeedId(getLocationId(0)));
// console.log(maps);

const seedsStartsAndRanges = lines[0]
  .slice(7)
  .split(" ")
  .map((s) => parseInt(s));

let locationId = 0;
let seedId = getSeedId(locationId);
while (true) {
  let shouldWeBreak = false;
  for (let i = 0; i < seedsStartsAndRanges.length / 2; i++) {
    const start = seedsStartsAndRanges[2 * i];
    const range = seedsStartsAndRanges[2 * i + 1];

    if (start <= seedId && seedId < start + range) {
      shouldWeBreak = true;
      break;
    }
  }
  if (shouldWeBreak) break;
  locationId++;
  seedId = getSeedId(locationId);

  if (locationId > 1000000000) break;
}

console.log(locationId, seedId, getLocationId(seedId), getSeedId(locationId));

const endTime = performance.now();

console.log(`Program took: ${(endTime - startTime) / 1000}s.`);
