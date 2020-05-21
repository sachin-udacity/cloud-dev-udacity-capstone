import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId, getAuthJwToken } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}

export function getJwToken(authorization: string) {
  const authorizationParams = authorization.split(' ')
  let token = authorizationParams[1];
  // remove this token when client end token retrieval is implemented.
  token = getAuthJwToken();
  return token
}
