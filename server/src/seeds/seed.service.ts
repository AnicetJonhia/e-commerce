import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';


@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
  // await this.clearAdminSeed(); 
  await this.seedAdminOnly();
}

//   async clearAdminSeed() {
//   await this.userRepository.delete({ email: 'admin@aj.aj' });
//   console.log('🗑 Admin user deleted');
// }


  async seedAdminOnly() {
    const existingAdmin = await this.userRepository.findOne({
      where: { email: 'admin@aj.aj' },
    });

    if (existingAdmin) {
      console.log('ℹ️ Admin already exists. Skipping seed.');
      return;
    }

    const adminUser = this.userRepository.create({
      email: 'admin@aj.aj',
      password: 'Admin123*',
      firstName: 'Admin',
      lastName: 'User',
      roles: ['admin', 'user'],
    });

    await this.userRepository.save([adminUser]);
    console.log('✅ Admin user seeded successfully.');
  }
}
