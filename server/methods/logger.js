const time = require('./time.js')

// Log system
async function log(service, data) {
	// show message
	console.log(`${time.getTime()} [${service}] ${data}`)
}

module.exports = {
	log
}