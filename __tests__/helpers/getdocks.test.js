const { getDistance, getOccupancy } = require("../../helpers/getdocks");
describe("getDistance function", function () {
  let coord1;
  let coord2;
  let dock;

  beforeEach(function () {
    coord1 = { lat: 51.519914, lng: -0.136039 };
    coord2 = { lat: 51.519914, lng: -0.136039 };
    response = {
      $type:
        "Tfl.Api.Presentation.Entities.Place, Tfl.Api.Presentation.Entities",
      id: "BikePoints_167",
      url: "/Place/BikePoints_167",
      commonName: "Eccleston Place, Victoria",
      placeType: "BikePoint",
      additionalProperties: [
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "TerminalName",
          sourceSystemKey: "BikePoints",
          value: "003465",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "Installed",
          sourceSystemKey: "BikePoints",
          value: "true",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "Locked",
          sourceSystemKey: "BikePoints",
          value: "false",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "InstallDate",
          sourceSystemKey: "BikePoints",
          value: "",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "RemovalDate",
          sourceSystemKey: "BikePoints",
          value: "",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "Temporary",
          sourceSystemKey: "BikePoints",
          value: "false",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "NbBikes",
          sourceSystemKey: "BikePoints",
          value: "18",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "NbEmptyDocks",
          sourceSystemKey: "BikePoints",
          value: "1",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "NbDocks",
          sourceSystemKey: "BikePoints",
          value: "19",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "NbStandardBikes",
          sourceSystemKey: "BikePoints",
          value: "18",
          modified: "2022-10-05T09:07:33.627Z",
        },
        {
          $type:
            "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
          category: "Description",
          key: "NbEBikes",
          sourceSystemKey: "BikePoints",
          value: "0",
          modified: "2022-10-05T09:07:33.627Z",
        },
      ],
      children: [],
      lat: 51.49395,
      lon: -0.147624,
    };
  });

  test("return distance between two geo coordinates", async function () {
    let distance = await getDistance(coord1, coord2);
    expect(distance).toEqual(distance);
  });

  //   test("given a dock's information, return ocuupancy with float less than 1.", async function () {
  //     let occupancy = await getOccupancy(dock);
  //     expect(occupancy).toBeLessThan(1.1);
  //   });
});
