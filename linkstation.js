"use strict";
exports.__esModule = true;
// Variable to hold given point[x,y]
var cordinates;
cordinates = [
    [0, 0],
    [100, 100],
    [15, 10],
    [18, 18]
];
//Find the Best link station for each given point and print the results on console
cordinates.map(findBestLinkStation).map(function (value) {
    if (!value.station) {
        console.log("No link station within reach for point  [", value.point[0], ',', value.point[1], "]");
    }
    else {
        console.log("Best link station for point [", value.point[0], ',', value.point[1], "] is[", value.station.coordinate[0], ',', value.station.coordinate[1], "] with power", value.station.power.toFixed(2));
    }
});
/**
 * Finds best link station for given coordinate point [x,y] from predefined stations
 * @cordinate holds the x and y values
 */
function findBestLinkStation(cordinate) {
    /* Variable to hold Predefined Link station value which are located at points (x, y) and have reach (r) ([x, y, r])
    Default value for Power :0*/
    var linkstations;
    linkstations = [
        { coordinate: [0, 0], reach: 10, power: 0 },
        { coordinate: [20, 20], reach: 5, power: 0 },
        { coordinate: [10, 0], reach: 12, power: 0 }
    ];
    var bestLinkStation = linkstations.map(function (station) {
        station.power = getPower(getDistance(cordinate, station.coordinate), station.reach);
        return station;
    }).filter(function (station) {
        return station.power > 0;
    }).sort(function (stationA, stationB) {
        return stationA.power > stationB.power;
    }).pop();
    return {
        point: cordinate,
        station: bestLinkStation
    };
}
/* Calculate link station power on basis of device distance and reach from link station
@distance: Link Station calculated distance
@reach: Link station's reach
Return Station power as number
*/
function getPower(distance, reach) {
    return (distance > reach) ? 0 : Math.pow((reach - distance), 2);
}
/* Calculate Distance between points
@pointA:Array consists tha value of x and y cordinates of given points
@pointB:Array  consists tha value of x and y cordinates of link station coordinates
Return Power as number
*/
function getDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(Math.abs(pointA[0] - pointB[0]), 2) + Math.pow(Math.abs(pointA[1] - pointB[1]), 2));
}
