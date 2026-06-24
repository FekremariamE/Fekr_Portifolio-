module.exports = {
  server: 'localhost', // or your SQL Server name
  database: 'Personal_web',
  options: {
    trustedConnection: true,
    // enableArithAbort: true,
    // encrypt: false
  },
  driver: 'msnodesqlv8'
};