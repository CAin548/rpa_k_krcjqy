// 代码生成时间: 2025-10-01 02:50:30
// Import necessary Ionic components and services
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WalletService } from './services/wallet.service';
import { WalletPage } from './pages/wallet/wallet.page';

/**
 * The root module of the application
 */
@NgModule({
  declarations: [
    AppComponent,
    WalletPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  providers: [
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

/**
 * The main component of the application
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}

/**
 * Service for managing cryptocurrency wallet operations
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'https://api.cryptocurrencyapi.com/';

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of cryptocurrencies
   * @returns Observable array of cryptocurrencies
   */
  getCryptocurrencies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'cryptocurrencies').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code ${error.status}, ` +
        `error message is: ${error.error}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }
}

/**
 * The wallet page component
 */
import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  cryptocurrencies: any[] = [];
  errorMessage: string = '';

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.loadCryptocurrencies();
  }

  /**
   * Loads the list of cryptocurrencies from the API
   */
  loadCryptocurrencies() {
    this.walletService.getCryptocurrencies().subscribe({
      next: (data) => {
        this.cryptocurrencies = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }
}
