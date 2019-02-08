import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PageComponent} from "../page/page.component";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {

  }
  getLeftAndRight(): Observable<any> {
    return this.http.get('api/data/leftandright')
      .pipe(
        catchError(error => {
          alert('error');
          return Observable.throw(error);
        })
      );
  }
  getRest(): Observable<any> {
    return this.http.get('api/data/rest')
      .pipe(
        catchError(error => {
          alert('error');
          return Observable.throw(error);
        })
      );
  }

  postData(numbers: any[]):Observable<any> {
    return this.http.post<any>('/api/data/weight', numbers)
      .pipe(
        catchError(error => {
          alert('Введены некорректные данные');
          return Observable.throw(error);
        })
      );
  }}
