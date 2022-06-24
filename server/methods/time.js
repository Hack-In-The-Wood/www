function getDate() {
	var d = new Date()
	var y = d.getFullYear()
	if (d.getMonth() < 10) {
		var m = '0' + (d.getMonth() + 1)
	} else {
		var m = d.getMonth() + 1
	}
	if (d.getDate() < 10) {
		var d = '0' + d.getDate()
	} else {
		var d = d.getDate()
	}
	return d + '/' + m + '/' + y
}

function getTime() {
	var d = new Date()
	if (d.getHours() < 10) {
		var h = '0' + d.getHours()
	} else {
		var h = d.getHours()
	}
	if (d.getMinutes() < 10) {
		var m = '0' + d.getMinutes()
	} else {
		var m = d.getMinutes()
	}
	if (d.getSeconds() < 10) {
		var s = '0' + d.getSeconds()
	} else {
		var s = d.getSeconds()
	}
	return h + ':' + m + ':' + s
}

module.exports = {
	getDate,
	getTime
}