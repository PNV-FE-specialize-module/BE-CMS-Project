import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { randomUUID } from 'crypto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendFaildCv(employeeEmail: string, employeeName: string) {
    await this.mailerService.sendMail({
      to: employeeEmail,
      subject: '[NINEAM] Welcome to Our Team at NINEAM',
      template: './assignMail.hbs',
      context: {
        name: employeeName,
      },
    });
  }
  async sendResetPwd(userEmail: string, code: string) {
    // const code = randomUUID()
    await this.mailerService.sendMail({
      to: userEmail,
      subject: '[NINEAM] RESET PASSWORD',
      template: './resetPasswordMail.hbs',
      context: {
        email: userEmail,
        code:  code
      },
    });
  }
}
