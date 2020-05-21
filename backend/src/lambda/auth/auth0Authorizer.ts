import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { JwtPayload } from '../../auth/JwtPayload'
import { JwtToken } from '../../auth/JwtToken'
import { getAuthJwToken } from '../../auth/utils'

const logger = createLogger('auth')

// Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = 'https://sachin-udacity-cloud-developer.auth0.com/.well-known/jwks.json'

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

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
    logger.error('User not authorized', { error: e.message })

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

// Mock authorization
async function verifyToken(authHeader: string): Promise<JwtPayload> {
  let token = getToken(authHeader)
  // remove this token when client end token retrieval is implemented.
  token = getAuthJwToken();
  // Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  const jwks = await Axios.get(jwksUrl)
  const keys = jwks.data.keys;
  const signingKeys = keys.filter(key => key.use === 'sig' // JWK property `use` determines the JWK is for signing
                                    && key.kty === 'RSA' // We are only supporting RSA (RS256)
                                    && key.kid           // The `kid` must be present to be useful for later
                                    && ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
                        ).map(key => {
                            return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) };
                        });

  const uidForKey = signingKeys[0].kid;
  const signingKey = signingKeys.find(key => key.kid === uidForKey);
  logger.info('Public key for verifying token: ', signingKey.publicKey)

  return verify(token, signingKey.publicKey, { algorithms: ['RS256'] } ) as JwtToken
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

function certToPEM(cert) {
    cert = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return cert;
}