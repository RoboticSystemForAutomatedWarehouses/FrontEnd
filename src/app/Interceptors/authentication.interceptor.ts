import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../services/authentication.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthenticationCookieInterceptor implements HttpInterceptor {

    constructor(private service: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).map(event => {
            if (event instanceof HttpResponse && event.status === 200) {
                console.log(event.headers);
                const authHeader = event.headers.get('isAuthenticated');
                const adminHeader = event.headers.get('isAdmin');
                if (authHeader !== null) {
                    this.service.isAuthenticated = parseInt(authHeader, 10) === 1;
                    this.service.isAdmin = parseInt(adminHeader, 10) === 1;
                }
            }
            return event;
        });
    }
}
