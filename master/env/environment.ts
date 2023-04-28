export class Environment {
  static env = process.env.NODE_ENV ?? 'dev';
  static baseUrl = process.env.BASE_URL ?? 'http://localhost:5005/';
  static postgres = {
    host:
      process.env.POSTGRES_HOST ??
      'jobsearch.c5syhxavindw.us-east-1.rds.amazonaws.com',
    port: process.env.POSTGRES_PORT ?? '5432',
    username: process.env.POSTGRES_USERNAME ?? 'postgres',
    password: process.env.POSTGRES_PWD ?? 'Silver#1234',
    database: process.env.POSTGRES_DB ?? 'jobsearch',
    // cert:
    //   process.env.POSTGRES_CERT ??
    //   '-----BEGIN CERTIFICATE-----\r\nMIIEQTCCAqmgAwIBAgIUEgJJJCN2yGEbPAemjgdvzUZYT6UwDQYJKoZIhvcNAQEM\r\nBQAwOjE4MDYGA1UEAwwvYTg3MTE3NmYtYTkzMi00YjZmLTk3ODItOTA5YmY4ODFh\r\nYjZjIFByb2plY3QgQ0EwHhcNMjIwNTA2MDcwNzU2WhcNMzIwNTAzMDcwNzU2WjA6\r\nMTgwNgYDVQQDDC9hODcxMTc2Zi1hOTMyLTRiNmYtOTc4Mi05MDliZjg4MWFiNmMg\r\nUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAN9GFoRN\r\n9rCEPVTXhxPgRzVFAWJoEap0CSWaZwrz5ifmbD73bY7VN/+uMJ0GKKDZFNO3Rdtn\r\n6FUIK1WCyMi++k+SWSET8PyO7Vpq0sTq43iOS3bANaTWlCqLCjFW7onsVXWAqRiJ\r\nUuS0IpaKw2C8OsZUD7dNDO6RybRk/Q1rwf0gyY54CnWobtJnDl08fRBnObm0vz2k\r\nywHQAbMcHUbHVgpgHNjrjoeW+XWvlBzXIS1Ixz98BAM5GVrCtpIOQuMTzSX70Ohn\r\ndLsz+CvuX5M0+t/C9P6bTQN1zENJFNegj0lHy9RtIL5BBkLIReLFBNBkJPxDNMvU\r\nYS96sFX4GwvfFbDQSl4TCH2yO9B4yYDalxRJe4lqba1VUC7tnjY0MCx+5PzKLFzz\r\nnCrggQcmZmnuTvHdw8CnaGlFEvehlxcmygW0CKRpVFxQQZLT9cUOlXiCh8mUIhZc\r\nRBk/m9LpwO4MCJwcEEgMqmtYoNqFjGpATLSThV4PR5SHZpJHA/B2x4g5NwIDAQAB\r\noz8wPTAdBgNVHQ4EFgQUoA7CmGk+hFm/8zKeSMOTyT/VeTowDwYDVR0TBAgwBgEB\r\n/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBALDC2h3n3T+ynBUi\r\n4zLM6ZGBApk7qsSotH0EHPk1qtidywiwHUhAmvmCh/d96k+xMbitXuTAigCmpL0R\r\nUkN1nuO9EXjsdmSNMegjgZRyGM0SASPAHa+bwp/WlBbW7GhqDgrBgm4ZRatnrbf5\r\nJjOvIOmr5mHVBqhc8cPDlvfznONpKEV0pbck4xEenVW8UfBwj/gNLesn6qOlbM+F\r\nFdM75RoKKfNE9OTBaL9RabkFHa7aWbocGxkmgCGMWtjriKK8W2fibHCnoBodQwxw\r\nBp3P01fjTPfLiAFIq4lMcDqSvPt7T7LDMRha3vOreMlVUdlXGtuPA8Ke89FK87PL\r\nxuV9KtvX3PsgIq8qRMKjppt/O/rq17q16xd3U3n8+Jy3S/v1Rpdcr4BN+yqTOhJL\r\nUpq4rVWBF3qACq/zy17UiVWGwT2S6qprQ5dvwQaM/HQaQezl/W/IxR09hl1JzIXZ\r\n2OdY8/JfFEJVvaC7Q6KQKUpfnW12DNRzJ3W4mJRauU93akilfQ==\r\n-----END CERTIFICATE-----\r',
  };
}
