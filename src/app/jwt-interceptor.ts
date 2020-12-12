import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let bearerToken = this.userService.currentBearerTokenValue;

    if (bearerToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
    }

    return next.handle(request);
  }
}
