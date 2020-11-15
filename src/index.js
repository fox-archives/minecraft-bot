import assert from 'assert'
import * as grpc from '@grpc/grpc-js'
import { App, LogLevel } from '@slack/bolt'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import FormData from 'form-data'
import messages from './gen/Message_pb.js'
import services from './gen/Message_grpc_pb.js'

dotenv.config()

/**
 * @param {string} text
 */
function sendSlack(text) {
	let form = new FormData()
	form.append('token', process.env.SLACK_BOT_TOKEN)
	form.append('text', text)
	form.append('channel', 'C0P5NE354')
	form.append('as_user', 'true')

	fetch('https://slack.com/api/chat.postMessage', {
		method: 'POST',
		body: form,
	})
		.then((res) => {
			console.info(res.json())
		})
		.catch((/** @type unknown */ err) => {
			console.info(err)
		})
}

async function boldInit() {
	const app = new App({
		signingSecret: process.env.SLACK_SIGNING_SECRET,
		logLevel: LogLevel.DEBUG,
		token: process.env.SLACK_BOT_TOKEN,
		endpoints: {
			events: '/slack/events',
			commands: '/slack/commands',
		},
	})

	app.error((/** @type Error */ err) => {
		console.error(err)
	})

	const port = process.env.PORT || 3000
	await app.start(port)
	console.info('Bolt Started')
}

function sendMessage(call, callback) {
	var reply = new messages.HelloReply()
	const name = call.request.getName()

	sendSlack(name)
	console.info(call.request.getName())
	reply.setMessage('Hello ' + call.request.getName())
	callback(null, reply)
}

let server = new grpc.Server()
server.addService(services.MessengerService, { sendMessage })
server.bindAsync(
	'0.0.0.0:50051',
	grpc.ServerCredentials.createInsecure(),
	() => {
		server.start()
	}
)
