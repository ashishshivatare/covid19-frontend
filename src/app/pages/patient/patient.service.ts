import { Injectable } from '@angular/core';
import { IPatient } from './patient';
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
export class PatientService {
  private patientsUrl = 'https://covid19-india.us-e2.cloudhub.io/all';
  constructor(private http: HttpClient) {}
  getPatients(): Observable<any> {
    return this.http.get(this.patientsUrl).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err);
  }
}
