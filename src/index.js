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
	const minecraftBridgeChannel = 'C01DY8LPP5K'

	let form = new FormData()
	form.append('token', process.env.SLACK_BOT_TOKEN)
	form.append('text', text)
	form.append('channel', minecraftBridgeChannel)
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

function sendSlackMessage(call, callback) {
	const player = call.request.getPlayer()
	const text = call.request.getText()

	console.info('foo', player, text)

	const reply = new messages.SlackMessageReply()
	reply.setStatus(1) // success
	callback(null, reply)
}

let server = new grpc.Server()
server.addService(services.MessengerService, { sendSlackMessage })
server.bindAsync(
	'0.0.0.0:50051',
	grpc.ServerCredentials.createInsecure(),
	() => {
		server.start()
	}
)
