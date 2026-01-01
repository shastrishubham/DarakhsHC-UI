import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, throwError } from 'rxjs';
// import { Headers, HttpClient , RequestOptions, Response, ResponseContentType, URLSearchParams } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import * as enums from '../model/enums';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpHelper {
    private tokenKey = 'app_token';
    private loginTimeKey = 'loginTime';
    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private injector: Injector) { }

    postMethod(urlString: string, bodyString: any, queryParams: { [key: string]: any } | null, contentType: enums.HttpContentType,
        // tslint:disable-next-line:align
        accept: enums.HttpAccept, isAppendToken: boolean) {

        const headers = new HttpHeaders();
        this.setContentType(headers, contentType);
        this.setAccept(headers, accept);
        if (isAppendToken) {
            this.appendToken(headers);
        }

        // Query Params
        let params = new HttpParams();
        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                params = params.set(key, queryParams[key]);
            });
        }

        return this.http.post<any>(urlString, bodyString, { headers, params }).pipe(
            map(res => res), // HttpClient auto parses JSON
            catchError(error => {
                return throwError(() => this.errorHandler(error));
            })
        );

    }

    putMethod(urlString: string, bodyString: any, queryParams: { [key: string]: any } | null, contentType: enums.HttpContentType,
        // tslint:disable-next-line:align
        accept: enums.HttpAccept) {

        const headers = new HttpHeaders();
        this.setContentType(headers, contentType);
        this.setAccept(headers, accept);

        // Query params
        let params = new HttpParams();
        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                params = params.set(key, queryParams[key]);
            });
        }

        return this.http.put<any>(urlString, bodyString, { headers, params }).pipe(
            map(res => res), // HttpClient auto-parses JSON
            catchError(error => {
                return throwError(() => this.errorHandler(error));
            })
        );

    }

    getMethod(urlString: string, queryParams: { [key: string]: any } | null, contentType: enums.HttpContentType,
        accept: enums.HttpAccept, isAppendToken: boolean) {

        const headers = new HttpHeaders();
        this.setContentType(headers, contentType);
        this.setAccept(headers, accept);
        if (isAppendToken) {
            this.appendToken(headers);
        }

        // Query parameters
        let params = new HttpParams();
        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                params = params.set(key, queryParams[key]);
            });
        }

        return this.http.get<any>(urlString, { headers, params }).pipe(
            map(res => res),
            catchError(error =>
                throwError(() => this.errorHandler(error))
            )
        );


    }

    getDownloadFile(urlString: string, queryParams: { [key: string]: any } | null, contentType: enums.HttpContentType, accept: enums.HttpAccept,
        isAppendToken: boolean) {

        const headers = new HttpHeaders();
        this.setContentType(headers, contentType);
        this.setAccept(headers, accept);

        if (isAppendToken) {
            this.appendToken(headers);
        }

        // Query Params
        let params = new HttpParams();
        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                params = params.set(key, queryParams[key]);
            });
        }

        return this.http.get(urlString, {
            headers,
            params,
            responseType: 'blob'
        });

    }



    private appendToken(headers: HttpHeaders) {
        // const storedToken: string = sessionStorage.getItem('app_token');
        // const storedToken = this.locastorageService.GetCurrentTabToken();
        // if (storedToken) {
        //     headers = headers.append('Authorization', 'Bearer ' + storedToken);
        // } else {
        // use when Run Unit Test
        // const token = JSON.parse(this.locastorageService.getItem('token'));
        // headers = headers.append('Authorization', 'Bearer ' + token);
        // }
    }
    
    private setContentType(headers: HttpHeaders, contentType: enums.HttpContentType) {
        if (contentType === enums.HttpContentType.Json) {
            headers = headers.append('Content-Type', 'application/json;charset=utf-8');
        } else if (contentType === enums.HttpContentType.XwwwFormUrlencoded) {
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        }
    }

    private setAccept(headers: HttpHeaders, accept: enums.HttpAccept) {
        if (accept === enums.HttpAccept.Json) {
            headers = headers.append('Accept', 'application/json;charset=utf-8');
        } else if (accept === enums.HttpAccept.OctetStream) {
            headers = headers.append('Accept', 'application/octet-stream;charset=utf-8');
        }
    }

    // public errorHandler(error: any) {
    //     console.log(error.status);
    // }
    private errorHandler(error: HttpErrorResponse) {
        console.warn(error);
        alert(error);
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // // 403  indicates that the server understood the request but refuses to authorize it.
            if (error.status === 403) {
                console.log('session expired please logout and login again');
            } else if (error.status === 400) {
                alert('Either Licensing process is shutdown or License session expired, please try to logout and login again.');
            } else {
                console.log('Error');
                console.error(
                    `Backend returned code ${error.status}, ` +
                    `body was: ${error.message}`);
            }
        }
        // return an observable with a user-facing error message
        return throwError('Unexpected error');
    }

    private getJsonResponse(res: Response) {
        return res.json();
    }
}
