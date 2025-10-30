// 代码生成时间: 2025-10-30 23:50:18
// Importing required modules and services
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private baseUrl = 'https://api.example.com/medications'; // API endpoint for medications

  constructor(private http: HttpClient) {
  }

  /**
   * Fetch all medications from the server.
   * @returns {Observable} An Observable of medications array.
   */
  getMedications(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      retry(3), // Retry up to 3 times
      catchError(this.handleError) // Catch any errors that occur
    );
  }

  /**
   * Add a new medication to the server.
   * @param {Object} medication - The medication object to be added.
   * @returns {Observable} An Observable of the result of the addition.
   */
  addMedication(medication: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, medication).pipe(
      catchError(this.handleError) // Catch any errors that occur
    );
  }

  /**
   * Update an existing medication on the server.
   * @param {Object} medication - The medication object to be updated.
   * @returns {Observable} An Observable of the result of the update.
   */
  updateMedication(medication: any): Observable<any> {
    const url = `${this.baseUrl}/${medication.id}`;
    return this.http.put<any>(url, medication).pipe(
      catchError(this.handleError) // Catch any errors that occur
    );
  }

  /**
   * Delete a medication from the server.
   * @param {number} id - The ID of the medication to be deleted.
   * @returns {Observable} An Observable of the result of the deletion.
   */
  deleteMedication(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError) // Catch any errors that occur
    );
  }

  /**
   * Handle HTTP error.
   * @private
   * @param {any} error - The error caught during HTTP operations.
   * @returns {Observable} An Observable of the error message.
   */
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
