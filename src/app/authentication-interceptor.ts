import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './services/authentication.service';
import { ServerResponse } from './models/server-response';
import { RemoteUrl } from './models/remote-url';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private service: AuthenticationService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ withCredentials: true });
        let handler: Observable<HttpEvent<any>>;
        if (req.url === RemoteUrl.Account.Logout || req.url === RemoteUrl.Account.Login) {
            handler = next.handle(req).map(event => {
                if (event instanceof HttpResponse && event.status === 200) {
                    const res = <ServerResponse<any>>event.body;
                    if (res.success) {
                        this.service.Id = res.message;
                    }
                }
                return event;
            });
        } else {
            handler = next.handle(req);
        }
        return handler.catch((err, caught) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.handleNotAuthorized();
                return;
            }
            return caught;
        });
    }

    private handleNotAuthorized() {
        alert('This page requires being authorized. You\'ll be redirected to login page momentarily.');
        this.service.Id = null;
        this.router.navigate(['/login']);
    }
}
