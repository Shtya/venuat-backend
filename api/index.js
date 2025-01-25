const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const server = express();
  server.use(app.getHttpAdapter().getInstance());

  return server;
}

module.exports = bootstrap();