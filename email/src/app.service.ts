import { Injectable } from '@nestjs/common';
import NotifmeSdk from 'notifme-sdk';

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
@Injectable()
export class AppService {

  notifme = new NotifmeSdk({
    useNotificationCatcher: true
  })

  sendEmail (options: EmailOptions) {

    return this.notifme.send({
      email: options
    })

  }

}
