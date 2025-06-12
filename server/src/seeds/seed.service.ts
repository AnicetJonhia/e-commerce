import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
  // await this.clearAdminSeed(); 
  await this.seedAdminOnly();
}

//   async clearAdminSeed() {
//   await this.userRepository.delete({ email });
//   console.log('🗑 Admin user deleted');
// }


  async seedAdminOnly() {

    const email = this.configService.get<string>('ADMIN_EMAIL');
    const password = this.configService.get<string>('ADMIN_PASSWORD');

    const existingAdmin = await this.userRepository.findOne({
      where: { email},
    });

    if (existingAdmin) {
      console.log('ℹ️ Admin already exists. Skipping seed.');
      return;
    }

    const adminUser = this.userRepository.create({
      email,
      password,
      firstName: 'Admin',
      lastName: 'User',
      roles: ['admin', 'user'],
    });

    await this.userRepository.save([adminUser]);
    console.log('✅ Admin user seeded successfully.');
  }
}
