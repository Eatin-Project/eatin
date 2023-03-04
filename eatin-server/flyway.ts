module.exports = function () {
  return {
    flywayArgs: {
      url: 'jdbc:postgresql://10.10.248.108/postgres',
      schemas: 'public',
      locations: 'filesystem:migrate',
      user: 'eatin',
      password: 'eatin',
      sqlMigrationSuffixes: '.pgsql',
      baselineOnMigrate: true,
    },
    downloads: {
      expirationTimeInMs: -1,
    },
  };
};
