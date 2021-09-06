import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService, EmailOptions } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mail_send')
  mailSend(options: EmailOptions) {
    return this.appService.sendEmail(options)
  }
}
