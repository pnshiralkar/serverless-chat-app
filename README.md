# Serverless Chat App

### A chat application built using Node and deployed in serverless environment on AWS.
#### [Live website available here](https://d3nf7m4z1t4ner.cloudfront.net/)
#### [Github repo for frontend built in React](https://github.com/pnshiralkar/serverless-chat-app-client)

## Key tech specs :

- Built using Node.js 12 and AWS DynamoDB.
- Deployed using Serverless framework
- Used Auth0 (OAuth) secured authentication.
- Realtime message exchange using Websockets on AWS API Gateway.
- Images shared are stored in S3 bucket and accessible only to the user who sent and recieved it using presigned URLs.
- Codebase follows Hexagonal Architecture, i.e. Logic code is isolated from AWS specific code.
- Frontend built in React is a SPA served using S3 and AWS Cloudfront CDN.
