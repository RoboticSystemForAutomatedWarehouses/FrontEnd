import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './services/authentication.service';
import { ServerResponse } from './models/server-response';
import { RemoteUrl } from './models/remote-url';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private service: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ withCredentials: true });
        if (req.url === RemoteUrl.Account.Logout || req.url === RemoteUrl.Account.Login) {
            return next.handle(req).map(event => {
                if (event instanceof HttpResponse && event.status === 200) {
                    const res = <ServerResponse<any>>event.body;
                    console.log(event);
                    if (res.success) {
                        this.service.Id = res.message;
                    }
                }
                return event;
            });
        }
        return next.handle(req);
    }
}
