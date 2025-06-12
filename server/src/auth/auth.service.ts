import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await user.validatePassword(password);
   

    if (isPasswordValid) {
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }


  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Create user
    const newUser = await this.usersService.create({
      ...registerDto,
      roles: ['user'], // Default role
    });

    // Generate token
    const { password, ...result } = newUser;
    return this.login(result);
  }
}