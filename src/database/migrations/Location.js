const createLocationTable = async (client) => {
  const query = `
  CREATE TABLE IF NOT EXISTS location (
    id SERIAL PRIMARY KEY,
    location VARCHAR(225) NOT NULL UNIQUE,
    no_of_males INTEGER NOT NULL,
    no_of_females INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
  `;
  try {
    await client.query(query);
  } catch (error) {
    console.log('create location table error: ', error);
  }
};

export default createLocationTable;
