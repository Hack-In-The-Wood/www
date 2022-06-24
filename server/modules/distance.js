const coordFormat = /\d*\.\d*/

function measure(lat1, lon1, lat2, lon2) {
    var R = 6378.137; var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); var d = R * c;
    return Math.floor(d * 1000);
}

function diff(params) {
    if(coordFormat.test(params.lat1) && coordFormat.test(params.lon1) && coordFormat.test(params.lat2) && coordFormat.test(params.lon2)) {
        distance = measure(params.lat1, params.lon1, params.lat2, params.lon2)
        return {
            success: true,
            distance: distance
        }
    } else {
        return {
            success: false,
            message: "invalid"
        }
    }
}

module.exports = {
	diff
}