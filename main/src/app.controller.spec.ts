import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let emailService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          { name: 'EMAIL_SERVICE', transport: Transport.TCP },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    emailService = app.get('EMAIL_SERVICE');

    appController = app.get<AppController>(AppController);
  });

  describe('email', () => {
    it('should able to send email', async () => {

      jest.spyOn(emailService, 'send').mockReturnValue({ status: 'success' })

      const response = await appController.sendEmail({
        from: 'from@test.com',
        to: 'to@test.com',
        subject: 'Subject',
        html: 'Testing'
      })

      expect(response).toEqual(expect.objectContaining({ status: 'success' }));
    });
  });
});
