import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = process.env.CONNECTIONSTRING;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_CONNECTIONSTRING;
}

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PROD_CONNECTIONSTRING;
}

const client = new Client({ connectionString });

client.connect();

export default client;
