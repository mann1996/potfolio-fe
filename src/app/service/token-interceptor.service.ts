import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    let us: UserService = this.injector.get(UserService);
    let tokinzedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${us.getToken()}`,
      },
    });
    if (req.url.match(/update\/profile/)) {
      tokinzedReq = req.clone({
        setHeaders: {
          'Content-type': `application/json-patch+json`,
          Authorization: `Bearer ${us.getToken()}`,
        },
      });
    }
    return next.handle(tokinzedReq);
  }
}
