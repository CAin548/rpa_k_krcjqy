// 代码生成时间: 2025-10-16 03:28:24
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/**
 * Service for handling data analysis operations.
 */
@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {
  private apiEndpoint = 'https://api.example.com/data';  // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetches data from the server and returns an Observable.
   * @param params Parameters for the data request.
   */
  fetchData(params: any): Observable<any> {
    return this.http.get(`${this.apiEndpoint}`, { params })
      .pipe(
        retry(3),  // Retry up to 3 times on error
        catchError(this.handleError)  // Handle any error that occurs during HTTP request
      );
  }

  /**
   * Calculates and returns the average of an array of numbers.
   * @param data An array of numbers.
   */
  calculateAverage(data: number[]): number {
    if (data.length === 0) {
      throw new Error('Data array is empty');
    }
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
  }

  /**
   * Calculates and returns the median of an array of numbers.
   * @param data An array of numbers.
   */
  calculateMedian(data: number[]): number {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
      return (sortedData[middleIndex] + sortedData[middleIndex - 1]) / 2;
    } else {
      return sortedData[middleIndex];
    }
  }

  /**
   * Calculates and returns the mode of an array of numbers.
   * @param data An array of numbers.
   */
  calculateMode(data: number[]): number {
    const frequencyMap = data.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as {[key: number]: number});
    const maxFrequency = Math.max(...Object.values(frequencyMap));
    const modes = Object.keys(frequencyMap).filter(key => frequencyMap[key] === maxFrequency);
    return Number(modes[0]);  // Return the first mode encountered
  }

  /**
   * Handles HTTP errors.
   * @private
   * @param error The error object.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
