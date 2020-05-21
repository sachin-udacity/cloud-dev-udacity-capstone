import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}

export function getAuthJwToken() {
  // remove this token when client end token retrieval is implemented.
  let token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpPT2VNUmNaR3RaWXE1M1ItQmJxdCJ9.eyJpc3MiOiJodHRwczovL3NhY2hpbi11ZGFjaXR5LWNsb3VkLWRldmVsb3Blci5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVjMDQ1Zjg0MGZhNTYwYzc1NjIyNjJlIiwiYXVkIjoiRU12a3dxTjN3eTNhazRoMnBSclR6dFduSWNrVk1WWlEiLCJpYXQiOjE1ODk2NTkxODEsImV4cCI6MTU5MDA5MTE4MSwiYXRfaGFzaCI6IkNCMzBTS2VhWjVGajFMMUdYdFBMdUEiLCJub25jZSI6Ik1ZMEtWWWpydDRRN0g3X2VLZy1NclZjdy5UM2dJMW5lIn0.cG28hiV1ELnpwJ0dFOmZQHEEObQ2dhUNJWxjezDu9usA4xy2ocIkurd4siy5T4QV5WDLHD7AysaivJMRqjJ6fXEiP9TrYeFEFNSbtOERZKqNw-lOeycAi4_a9EqoyXxvNgAgx5uTqofF87yir0qZDje6HZ8mVuLE44bYcyHk8BjL1QeajUnZt4PAbfysTOLT1zICzx2LzaN01L6oqCJ52nwKlJ0h1n3xR-MCt7xKzoyCw2LsCiMNN6VEfZz4uKeSIkUN1os-BOSbR42uXOuCfzGKwEY4CP5bBtFD51A2TsUYfPPV6WfB03C78yMOvHUKY4pd0ACi-WCVeNHZTD8Oyw`;
  return token
}
