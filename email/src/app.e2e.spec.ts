import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

describe('Email Service e2e test', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          { name: 'EMAIL_SERVICE', transport: Transport.TCP },
        ]),
      ]
    })
    .compile();

    app = moduleRef.createNestApplication();
    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('EMAIL_SERVICE');
    await client.connect();
  });

  it('should able to send email', done => {
    const pattern = 'mail_send';
    const payload = {
      from: 'from@test.com',
      to: 'to@test.com',
      subject: 'This is subject',
      html: 'content'
    };

    client.send(pattern, payload).subscribe(response => {
      expect(response).toEqual(expect.objectContaining({ status: 'success' }));
      done();
    })
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });
});