import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftAuthService {

  private clientId = 'b8af4c57-8f33-4b5a-a355-15c523c7ee84';
  private tenantId = 'e86d5552-1dae-455c-b103-5560ae0c36a9';
  private redirectUri = 'http://localhost:4200/';
  private tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

  constructor(private http: HttpClient) { }

  async microSignIn() {
    const redirectUri = encodeURIComponent(this.redirectUri);

    const codeVerifier = this.generateCodeVerifier();
    localStorage.setItem('codeVerifier', codeVerifier);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const authUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize
      ?client_id=${this.clientId}
      &response_type=code
      &redirect_uri=${redirectUri}
      &scope=openid profile email User.Read
      &response_mode=query
      &code_challenge_method=S256
      &code_challenge=${codeChallenge}`;

    window.location.href = authUrl;
  }

  generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }  

  async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64 = btoa(String.fromCharCode.apply(null, hashArray))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64;
  }

  exchangeCodeForToken(authCode: string) {
    const body = new URLSearchParams();
    body.set('client_id', this.clientId);
    body.set('grant_type', 'authorization_code');
    body.set('code', authCode);
    body.set('redirect_uri', this.redirectUri);
    body.set('code_verifier', localStorage.getItem('codeVerifier') || '');

    return this.http.post(this.tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  getUserProfile(accessToken: string) {
    return this.http.get('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  logout() {
    const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(this.redirectUri)}&prompt=login`;
    window.location.href = logoutUrl;
  }
}
