import * as express from 'express'
import { DatabaseConnector } from './util/DatabaseConnector'
import { IpListFinder } from './util/IpListFinder'
import * as config from 'config'

export class App {
	public express
	constructor() {
		this.express = express()
		this.express.use(express.json())
		this.mountRoutes()
	}

	private async mountRoutes() {
		const router = express.Router()
		const client = await DatabaseConnector.getDatabaseConnection(config.dbUrl, config.dbUser, config.dbPassword, config.tls)
		const collection = 'ips'

		router.get('/health', (req, res) => {
			res.status(200).send("ok")
		})
		router.post('/ipcheck', async (req, res) => {
			try {
				const ip = req.body.ip
				const db = await client.db()
				console.time('query')
				const result = await db.collection(collection).find({ip})
				const ipSets = await IpListFinder.findIpLists(result)
				console.timeEnd('query')
				res.status(200).send(ipSets)
			} catch(e) {
				console.log('issue with db connection',e)
				res.status(500).send(e)
			}
		})
		this.express.use('/',router)
	}
}

export default new App().express