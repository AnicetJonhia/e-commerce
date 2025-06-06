// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './database/seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  await seedService.seedDatabase();
  await app.close();
}

bootstrap().then(() => {
  console.log('✅ Seeding complete');
}).catch((err) => {
  console.error('❌ Seeding failed', err);
});
