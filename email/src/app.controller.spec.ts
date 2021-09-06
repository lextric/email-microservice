import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('email', () => {
    it('should able to send email"', async () => {
      const response = await appController.mailSend({
        from: 'from@test.com',
        to: 'to@test.com',
        subject: 'Subject',
        html: 'Testing'
      })
      expect(response).toEqual(expect.objectContaining({ status: 'success' }));
    });
  });
});
