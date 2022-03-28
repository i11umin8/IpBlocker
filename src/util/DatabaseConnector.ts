import { MongoClient } from 'mongodb'

export class DatabaseConnector {

    static async getDatabaseConnection(dbUrl: string, dbUser: string, dbPassword: string, tls: string) {
        const uriWithAuth = dbUser && dbPassword ? `ipblocker:testtest@${dbUrl}` : dbUrl
        const databaseConnectionUrl = `mongodb://${uriWithAuth}/ipblocker`

        console.log('databse connector', databaseConnectionUrl)
        const client = 
            tls 
            ?  new MongoClient(databaseConnectionUrl, {tlsCAFile: 'rds-combined-ca-bundle.pem', directConnection: true,  tls: true})
            :  new MongoClient(databaseConnectionUrl)
            console.log('attempting connection')
            await client.connect()
            console.log('success')
            return client
    }
}
