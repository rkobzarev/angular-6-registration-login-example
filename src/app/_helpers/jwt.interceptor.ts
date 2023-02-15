import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log('JwtInterceptor',currentUser)
        if (currentUser && currentUser.session_token) {            
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.session_token}`
                }
            });
        }

        return next.handle(request);
    }
}