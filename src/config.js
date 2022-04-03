export default () => ({
  port: process.env.API_PORT,
  secret: process.env.JWT_SECRET,
  database: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DATABASE
  }
});
