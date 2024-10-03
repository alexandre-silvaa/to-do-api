import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerDto } from './dto/mailer.dto';
import * as nodemailer from 'nodemailer';
import {
  GOOGLE_MAIL_APP_EMAIL,
  GOOGLE_MAIL_APP_PASSWORD,
  GOOGLE_MAIL_HOST,
  GOOGLE_MAIL_PORT,
} from 'src/shared/constants/constants';

@Injectable()
export class MailerSendService {
  constructor(private readonly configService: ConfigService) {}

  async sendMailCreateTask({ to, subject, message }: MailerDto) {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>(GOOGLE_MAIL_HOST),
      port: this.configService.get<number>(GOOGLE_MAIL_PORT),
      auth: {
        user: this.configService.get<string>(GOOGLE_MAIL_APP_EMAIL),
        pass: this.configService.get<string>(GOOGLE_MAIL_APP_PASSWORD),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>(GOOGLE_MAIL_APP_EMAIL),
      to,
      subject,
      html: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      return;
    } catch (error) {
      console.error('error sending email ', error);
      return;
    }
  }
}
