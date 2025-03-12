import { HttpClient, HttpParams } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

declare const gapi: any;
declare const google: any;

interface ParamConfigs {
  [param: string]: string | number | boolean | readonly (string | number | boolean)[];
}

interface UserInfo {
  accessToken: string | null;
  idToken: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class auth {

  private profile = new Subject<any>();
  profile$ = this.profile.asObservable();

  userInfo : UserInfo = {
    accessToken: null,
    idToken: null,
  }
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // this.initializeGoogleLogin();
  }

  handleLogin(configs: ParamConfigs = {} ) {
    const defaultConfigs: ParamConfigs = {
      client_id: '',
      prompt: 'select_account',
      redirect_uri: window.location.origin,
      response_type: 'id_token token',
      scope: 'profile email',
      nonce: this.generateNonce() // Default value for nonce
    };

    const mergedConfigs = { ...defaultConfigs, ...configs };

    const params = new HttpParams({
      fromObject: mergedConfigs
    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  getTokensFromParams() {
   this.route.fragment.subscribe(fragment => {
      const response = new URLSearchParams(fragment as string);

      this.userInfo = {
        accessToken : response.get('access_token') || null,
        idToken: response.get('id_token') || null
      }
      
      if (this.userInfo.accessToken) {
        this._fetchProfile(this.userInfo.accessToken, this.userInfo.idToken);
      }

    });
  }

  private _fetchProfile(accesstoken: any, id_token: any) {
    this.fetchUserProfile(accesstoken).subscribe(
      (profile) => {
        this.profile.next(profile);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  generateNonce(length = 16) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < length; i++) {
      nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return nonce;
  }

  fetchUserProfile(accessToken: string) : Observable<any> {
    return this.http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken)
  }

  revokeToken(accessToken: string) {
    const params = new HttpParams({
      fromObject: {
        token: accessToken,
      },
    });

    this.http.post('https://oauth2.googleapis.com/revoke', params).subscribe(
      () => {
        console.log('Access token revoked');
      },
      (error) => {
        console.error('Error revoking access token:', error);
      }
    );
  }

  login(data: any) {
    // let headerData: any;
    // headerData = this.configService.attachDataHeaders(data);
    // headerData.observe = 'response';
    // const apiEndpoint = ResourceURL.login;
    // return this.http.post(apiEndpoint, '', headerData);
  }

  userLogout() {
    // sessionStorage.clear();
    // localStorage.setItem('isLoggedOut', 'true');
    // setTimeout(() => {
    //   localStorage.clear();
    //   localStorage.removeItem('isLoggedOut')
    // }, 100);
    // this.router.navigateByUrl(Routes.login);
  }


  // private initializeGoogleLogin() {
  //   google.accounts.id.initialize({
  //     client_id: this.clientId,
  //     callback: this.handleCredentialResponse.bind(this),
  //   });
  // }

  // private handleCredentialResponse(response: any) {
  //   const token = response.credential;
  //   console.log('Google Token:', token);
    
  //   // Decode JWT token to get user details
  //   const userInfo = this.decodeJwt(token);
  //   this.googleUser = userInfo;
  //   console.log('User Info:', userInfo);
  // }

  // private decodeJwt(token: string): any {
  //   try {
  //     return JSON.parse(atob(token.split('.')[1]));
  //   } catch (e) {
  //     console.error('Error decoding JWT', e);
  //     return null;
  //   }
  // }

  // getUser() {
  //   return this.googleUser;
  // }

  // logout() {
  //   this.googleUser = null;
  //   console.log('User logged out');
  // }
}

