import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { User } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

      if (!user) {
        throw new NotFoundException('Email does not exist');
      }
      // const isPasswordValid = bcrypt.compareSync(password, user.password);
    
      if (user.password!==password) {
        throw new UnauthorizedException('Incorrect password');
      }

    return {
      user,
      message: 'Successfully log in',
    };
  }

  async resetPwd(email: string){
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

      if (!user) {
        throw new NotFoundException('Email does not exist');
      }
      if (user) {
        user.password=randomUUID()

        await this.entityManager.save(user)
        return {user, message: 'Reset password successfully'}
      }
  }
}
