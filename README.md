# Email Delivery Service

This email delivery service is independent service used to send email using various services. Which has mostly two parts:

1. Consumers: This is for who wants to send email through this service. They can provide details to this service in following ways
   1. Either Call REST Endpoint with predefined payload
   2. Either publish data in RabbitMQ with provided details
2. Processing: This service will send email to provided datails and will update it's details to DB.

## Idea:

### [Here](https://drive.google.com/file/d/1eq7_q9YQ-wALu6oDZrLFy9nElqEYjBHt/view?usp=sharing) is the diagram which contains overview for this service.

## Setup:

1. Clone the repo
2. Set the environment file by making .env in Root of directory
3. Run below command
   ```
   pnpm i
   ```
4. Start server with watch mode using below command
   ```
   yarn dev
   ```

## Future Enhancement

1. Will provide webhook to update details once you provide details view REST call to this service.
2. Will publish data in RabbitMQ when email has been sent.
