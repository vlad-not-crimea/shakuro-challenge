import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const providers = [
    {id: 1, name: 'mtc'},
    {id: 2, name: 'beeline'},
    {id: 3, name: 'megaphone'},
    {id: 4, name: 'vodafone'},
    {id: 5, name: 'AT&T'}
]


@Injectable({
    providedIn: 'root'
})
export class ApiMockInterceptor implements HttpInterceptor {

    constructor() {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        switch(req.url) {
            case '/api/v1/cell-provider':
                return of(this._getCellProvidersResponse()).pipe(delay(1000));
            case '/api/v1/recharge':
                return of(1).pipe(delay(1000), map(() => this._getRechargeResponse(req)));
            default:
                return next.handle(req);
        }
    }


    private _getCellProvidersResponse() {
        return new HttpResponse({status: 200, body: providers});
    }

    private _getRechargeResponse(req: HttpRequest<any>) {
        if (Math.random() > 0.5) {
            return new HttpResponse({status: 200, body: {...req.body, id: 1}});
        } else {
            throw new HttpErrorResponse({status: 500, statusText: 'api exception', url: req.url});
        }
    }
}
