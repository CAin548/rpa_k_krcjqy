// 代码生成时间: 2025-10-05 03:12:28
 * This tool provides a basic interface to interact with a time series database.
 * It includes methods to insert, retrieve, and delete data.
 *
 * @version 1.0.0
 * @author Your Name
 */

// Import necessary Ionic and other dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesDbService {
  // URL to the time series database API
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Insert a new data point into the time series database.
   *
   * @param data The data point to insert.
   * @returns An observable of the response from the API.
   */
  insertData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/data`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve data from the time series database.
   *
   * @param query The query parameters for the retrieval.
   * @returns An observable of the response from the API.
   */
  retrieveData(query: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/data`, { params: query }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete data from the time series database.
   *
   * @param id The ID of the data point to delete.
   * @returns An observable of the response from the API.
   */
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/data/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors.
   *
   * @param error The error object received from the HTTP request.
   * @returns An observable that throws an error.
   */
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
