import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
// import { createLogger } from '../../utils/logger'
import { JwtPayload } from '../../schemas/JwtPayload'
const jwksClient = require('jwks-rsa');
const util = require('util')
// const logger = createLogger('auth')

const jwksUri:string = 'https://pnshiralkar.auth0.com/.well-known/jwks.json'
const kid: string = 'Zh51uQxw2Mk3lIm-aTbJF'
const client = jwksClient({jwksUri})


export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  // logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.queryStringParameters.Authorization)
    // logger.info('User was authorized')

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    // logger.error('User not authorized', { error: e.message })
    console.log(event)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const getSigningKey = util.promisify(client.getSigningKey)
  const key = await getSigningKey(kid)
  const secret = key.getPublicKey();
  return verify(token, secret, {algorithms: ['RS256']}) as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}