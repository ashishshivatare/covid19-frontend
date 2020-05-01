import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PatientStatsService {
  private patientsUrl = 'https://covid19-india.us-e2.cloudhub.io/piechart';
  constructor(private http: HttpClient) {}
  getPatientsStats(): Observable<any> {
    return this.http.get(this.patientsUrl).pipe(
      tap((data) => console.log("-")),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err);
  }
}
