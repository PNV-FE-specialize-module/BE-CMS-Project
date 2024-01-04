import { Body, Controller, Post } from '@nestjs/common';
import { UserServices } from './user.service';
import { MailService } from '../mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserServices,
    private readonly mailService: MailService
    ) {}

  @Post('login')
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.logIn(email, password);
  }
  @Post('reset')
  async resetPwd(
    @Body('email') email: string,
  ){
    const result = await this.userService.resetPwd(email);
    
    await this.mailService.sendResetPwd(
      result.user.email,
      result.user.password
    );
    return { result, message: 'Reset password successfully'}
  }
}
