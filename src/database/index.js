import client from './connect';
import createLocationTable from './migrations/Location';

/* Method to handle data migration for the database */
const runMigration = async () => {
  await createLocationTable(client);
  await client.end();
};

runMigration();
