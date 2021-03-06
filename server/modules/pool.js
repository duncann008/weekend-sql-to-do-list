const pg = require('pg');
const Pool = pg.Pool;
const config = {
    host: 'localhost',
    database: 'weekend-to-do-app'
};
const pool = new Pool(config);

pool.on('connect', () =>    {
    console.log('Server connected to database.');
});

pool.on('error', (poolError) => {
    console.error(poolError);
});

module.exports = pool;