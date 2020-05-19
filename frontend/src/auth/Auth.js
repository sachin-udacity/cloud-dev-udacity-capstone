import { Auth0Client } from '@auth0/auth0-spa-js';
import config from "./../auth_config.json";




class Auth {
    constructor() {
        this.auth0 = new Auth0Client({
            domain: config.domain,
            client_id: config.clientId
        });
        this.accessToken = null;
    }

    async getIdToken() {
        if (!this.accessToken) {
            this.accessToken = await this.auth0.getTokenSilently();
        }
        return this.accessToken;
    }
}

export default Auth;