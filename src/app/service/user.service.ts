import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../model/email.model';
import { UserRequestModel } from '../model/user-request.model';
import { UserResponseModel } from '../model/user-response.model';
import { LoginModel } from '../model/login-request.model';
import { ProfileModel } from '../model/profile.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  private hostUrl: string = environment.apiUrl + '/users/';
  constructor(private http: HttpClient) {}

  validateEmail(email: string): Observable<Email> {
    let req: Email = new Email();
    req.email = email;
    return this.http.post<Email>(this.hostUrl + 'validate', req);
  }

  createUser(user: UserRequestModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>(this.hostUrl + 'create', user);
  }

  loginUser(creds: LoginModel) {
    return this.http.post(this.hostUrl + 'login', creds, {
      observe: 'response',
    });
  }

  saveJwt(res: any) {
    localStorage.setItem('Authorization', res.headers.get('Authorization'));
    localStorage.setItem('UserId', res.headers.get('UserId'));
  }

  clearJwt() {
    if (localStorage.getItem('Authorization')) {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('UserId');
    }
  }

  getToken(): string {
    if (localStorage.getItem('Authorization'))
      return localStorage.getItem('Authorization').replace('Bearer ', '');
    else return '';
  }
  getUserId(): string {
    return localStorage.getItem('UserId');
  }

  loggedIn(): boolean {
    if (localStorage.getItem('Authorization')) {
      return true;
    } else {
      return false;
    }
  }

  getUser(userId: string): Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>(this.hostUrl + 'show/' + userId);
  }

  getUserProfile(userId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(this.hostUrl + 'profile/' + userId);
  }

  saveProfile(value, userId: string): Observable<ProfileModel> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/json-patch');
    return this.http.patch<ProfileModel>(
      this.hostUrl + 'update/profile/' + userId,
      value,
      {
        headers: headers,
      }
    );
  }

  toggleFollow(userId: string) {
    return this.http.get(this.hostUrl + 'add/follower/' + userId);
  }

  searchUser(key: string): Observable<ProfileModel[]> {
    return this.http.get<ProfileModel[]>(this.hostUrl + 'search?key=' + key);
  }
}
