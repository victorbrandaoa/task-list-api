export default () => ({
  port: process.env.API_PORT,
  database: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DATABASE
  }
});
