import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost/php_root/functions/auth/create_session.php`, { user: username, pass: password })
            .pipe(map(data => {
                // console.log(data.user)
                // login successful if there's a jwt token in the response
                if (data.user && data.user.session_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes                    
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                }

                return data;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}