## Description
This is simple microservice app that contain 2 component.
1. Main is app server to consume microservice
2. Email service is microservice that provide sending email feature

## Compromises/shortcuts due to time considerations
1. Proper logging
2. Implement [RpcExceptionFilter](https://docs.nestjs.com/microservices/exception-filters) for microservice 
3. Setup config for host, port, and email settings
4. Setup dockerfile
5. Setup docker-compose or kubernetes
6. Setup swagger as api doc
7. Setup validation for the payload, and provide proper error message

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

Main server will run on http://localhost:3000
Email service will run on localhost:3001
Mailbox webapp will run on http://localhost:1080

## Test

```bash
$ npm run test
```

## CURL to test the endpoint

```bash
$ curl -X 'POST' \
    'http://localhost:3000/email' \
    -H 'Content-Type: application/json' \
    -d '{
      "from": "from@test.com",
      "to": "to@test.com",
      "subject": "This is subject",
      "html": "content"
    }'
```