import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuthenticationResponse } from '../interfaces/authentication-response.interface';
import { ILoginRequest } from '../interfaces/login-request.interface';

@Injectable()
export class UserService {
  private currentBearerTokenSubject: BehaviorSubject<string>;
  public currentBearerToken: Observable<string>;

  private readonly BEARER_TOKEN_PREFIX = 'currentBearerToken';

  constructor(private http: HttpClient) {
    this.currentBearerTokenSubject = new BehaviorSubject<string>(localStorage.getItem(this.BEARER_TOKEN_PREFIX));
    this.currentBearerToken = this.currentBearerTokenSubject.asObservable();
  }

  public get currentBearerTokenValue(): string {
    return this.currentBearerTokenSubject.value;
  }

  login(request: ILoginRequest) {
    return this.http.post<IAuthenticationResponse>(`${environment.baseUrl}/users/sign-in`, request)
      .pipe(map(response => {
        localStorage.setItem(this.BEARER_TOKEN_PREFIX, response.bearerToken);
        this.currentBearerTokenSubject.next(response.bearerToken);
        return response;
      }));
  }

  logout() {
    localStorage.removeItem(this.BEARER_TOKEN_PREFIX);
    this.currentBearerTokenSubject.next(null);
  }

}
