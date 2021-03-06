const axios = require('axios')
const coordFormat = /\d*\.\d*/

function direction(params, callback) {
    if(coordFormat.test(params.lat1) && coordFormat.test(params.lon1) && coordFormat.test(params.lat2) && coordFormat.test(params.lon2)) {
        axios({
            method: 'get',
            url: `https://api.mapbox.com/directions/v5/mapbox/walking/${params.lon1}%2C${params.lat1}%3B${params.lon2}%2C${params.lat2}?alternatives=false&geometries=geojson&language=fr&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZm9uZHZlcnQiLCJhIjoiY2w0dDBibW4wMDgxcjNqbXp5cm1zd3lmdCJ9.U_vs8RLHTlY4B3AiBSqtOg`,
            headers: { }
        })
        .then(function (response) {
            let data = response.data
            if(data) {
                steps = []
                for(let i = 0; i < data.routes[0].legs[0].steps.length; i++) {
                    steps.push({
                        distance: data.routes[0].legs[0].steps[i].distance,
                        maneuver: data.routes[0].legs[0].steps[i].maneuver
                    })
                }
                callback({
                    success: true,
                    distance: data.routes[0].distance,
                    steps: steps
                })
            } else {
                callback({
                    success: false,
                    message: "invalid"
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    } else {
        callback({
            success: false,
            message: "invalid"
        })
    }
}

module.exports = {
	direction
}