const haversine = require("haversine-distance");
// import haversine from "haversine-distance";
const fetch = require("node-fetch");

const point1 = { lat: 51.519914, lng: -0.136039 };

async function getDistance(dock1_id, dock2_id) {
  let response1 = await fetch(`https://api.tfl.gov.uk/Place/${dock1_id}`);
  let data1 = await response1.json();
  let response2 = await fetch(`https://api.tfl.gov.uk/Place/${dock2_id}`);
  let data2 = await response2.json();
  let coord1 = { lat: data1["lat"], lng: data1["lon"] };
  let coord2 = { lat: data2["lat"], lng: data2["lon"] };
  const distance = (haversine(coord1, coord2) / 1000).toFixed(2);
  return distance;
}
async function getOccupancy(dock_id) {
  let response = await fetch(`https://api.tfl.gov.uk/Place/${dock_id}`);
  let data = await response.json();
  let occupancy = (
    parseInt(data["additionalProperties"][6].value) /
    parseInt(data["additionalProperties"][8].value)
  ).toFixed(2);
  return occupancy;
}
// fetch bikedocks , bike numbers, dock numbers, dock_id, dockname
async function getAllDocks() {
  let response = await fetch("https://api.tfl.gov.uk/BikePoint/");
  let data = await response.json();
  let docks = data.map(
    ({ lat, lon, id, commonName, additionalProperties }) => ({
      lat,
      lon,
      id,
      name: commonName,
      numBikes: parseInt(additionalProperties[6].value),
      numDocks: parseInt(additionalProperties[8].value),
      occupancy:
        parseInt(additionalProperties[6].value) /
        parseInt(additionalProperties[8].value),
      numEmptyDocks: parseInt(additionalProperties[7].value),
    })
  );
  //   console.log(docks);
  return docks;
}

/**{lat:,lng:}=>[{dock1},{dock2}...]
 * given geo coordinates return a list of docks within 500 meters
 */
async function getNearbyDocks(point1) {
  const current = { latitude: point1["lat"], longitude: point1["lng"] };
  const docks = await getAllDocks();
  let nearbyDocks = [];
  for (let i = 0; i < docks.length; i++) {
    let dock = { latitude: docks[i]["lat"], longitude: docks[i]["lon"] };
    let distance = (haversine(current, dock) / 1000).toFixed(2);
    if (distance < 0.5) {
      nearbyDocks.push(docks[i]);
    }
  }
  nearbyDocks.sort((a, b) => a.occupancy - b.occupancy);
  return nearbyDocks;
}

module.exports = { getNearbyDocks, getAllDocks, getOccupancy, getDistance };
