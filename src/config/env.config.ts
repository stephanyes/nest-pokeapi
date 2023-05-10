export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT || 3001,
  defaultLimit: +process.env.DEFAULT_LIMIT || 3, // had to add the + because the type was being forced to a string
});
