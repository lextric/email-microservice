import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
@Controller()
export class AppController {
  constructor(@Inject('EMAIL_SERVICE') private client: ClientProxy) {}

  @Post('email')
  sendEmail(@Body() options: EmailOptions) {
    return this.client.send('mail_send', options)
  }
}
