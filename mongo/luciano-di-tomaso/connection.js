import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config({ path: 'mongo/luciano-di-tomaso/.env' });

const uri = process.env.MONGODB;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let intance = null;

async function getConnection() {
    if (intance == null) {
        intance = client.connect();
    }
    return intance;
}

export { getConnection }