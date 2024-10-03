import { Module } from '@nestjs/common';
import { MailerSendService } from './mailer.service';

@Module({
  imports: [],
  providers: [MailerSendService],
  exports: [MailerSendService],
})
export class EmailModule {}
