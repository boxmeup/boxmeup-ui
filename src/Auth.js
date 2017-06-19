import AuthError from './errors/AuthError.js';
import ServerError from './errors/ServerError.js';

export default class Auth {
    constructor() {
        this.token = localStorage.getItem('auth_token') || '';
    }

    isAuthenticated() {
        return this.token.length > 0;
    }

    async authenticate(formElement) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: new FormData(formElement)
        });
        if (response.status === 500) {
            throw new ServerError('Unable to login at this time.');
        }
        const body = await response.json();
        if (!response.ok) {
            throw new Error(body.text);
        }
        this.token = body.token;
        localStorage.setItem('auth_token', this.token);
    }

    async authorizedFetch(url, options = {}) {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        const response = await fetch(url, Object.assign(options, {
            headers: headers
        }));
        if (response.status === 500) {
            throw new Error('Server failure.');
        }
        if (response.status === 401) {
            if (this.isAuthenticated()) {
                this.deauthenticate();
            }
            const message = await response.text();
            throw new AuthError(message);
        }
        const body = await response.json();
        if (!response.ok) {
            throw new Error(body.text);
        }
        return body;
    }

    deauthenticate() {
        this.token = '';
        localStorage.removeItem('auth_token');
    }
}
