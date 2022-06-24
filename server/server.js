// Public libraries
const fs = require('fs')
const { createServer } = require('http')
const { Server } = require('socket.io')

// Private libraries
const logger = require('./methods/logger')

// Init app
const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*"
	}
})

// Load config
const config = require('./config.json')

// Modules handler
const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith('.js'))

for (let file of moduleFiles) {
	eval(`var ${file.slice(0, file.length - 3)} = require('./modules/${file}')`)
	logger.log('Load module', `[true, ${file}]`)
}

// Ping
function ping() {
	return {
		success: true,
		message: "pong",
		time: Date.now()
	}
}

// Listen ports
httpServer.listen(config.server.port, () => {
	logger.log('Listen port', `[true, ${config.server.port}]`)
})

// Method web-socket
io.on('connection', (client) => {
	var connection = client.handshake.headers['x-real-ip']
	logger.log('Socket connect', `[true, "${connection}"]`)
	client.on('request' ,(req) => {
		try {
			var req_parse = req
			request(req_parse, connection, function(res) {
				logger.log('Socket receive', `[true, "${connection}"]`)
				client.emit('response', Object.assign(res, {target: req_parse.target}))
			})
		} catch {
			logger.log('Socket receive', `[false, "${connection}"]`)
			client.emit('response', {
				success: false,
				message: "bad request"
			})
		}
	})
	client.on('disconnect', () => {
		logger.log('Socket disconnect', `[false, "${connection}"]`)
	})
})

// Cooldown
class cooldown {
	constructor(time) {
		this.time = time
		this.data = new Set()
	}

	test(client) {
		if (this.data.has(client)) {
			return false
		} else {
			this.data.add(client)
			setTimeout(() => {
				this.data.delete(client)
			}, this.time)
			return true
		}
	}
}

const cooldownPing = new cooldown(20)

// Request manager
function request(req, connection, callback) {
	try {
		if (req.target) {
			switch (req.target.toLowerCase()) {
				// Core
				case 'ping':
					if (cooldownPing.test(connection)) {
						callback(ping())
					} else {
						callback({
							success: false,
							message: "wait"
						})
					}
					break

				default:
					callback({
						success: false,
						message: "bad request"
					})
			}
		} else {
			callback({
				success: false,
				message: "bad request"
			})
		}
	} catch {
		callback({
			success: false,
			message: "bad request"
		})
	}
}