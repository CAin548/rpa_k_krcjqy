// 代码生成时间: 2025-10-12 18:59:35
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpeechToTextService } from './services/speech-to-text.service';

// Caption Generator Ionic App Module
@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SpeechToTextService],
  bootstrap: [AppComponent]
})
export class AppModule {}

// AppComponent is the main component of the app
import { Component } from '@angular/core';
import { SpeechToTextService } from './services/speech-to-text.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  audioUrl: string = '';
  captionText: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private speechToTextService: SpeechToTextService) {}

  // Method to handle file input changes
  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      this.error = 'No file selected';
      return;
    }
    const file = fileInput.files[0];
    this.audioUrl = URL.createObjectURL(file);
  }

  // Method to generate captions from audio file
  generateCaptions(): void {
    if (!this.audioUrl) {
      this.error = 'No audio file selected';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.speechToTextService.getCaptions(this.audioUrl).subscribe({
      next: (captions) => {
        this.captionText = captions;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }
}

// SpeechToTextService is a service to convert speech to text
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SpeechToTextService {
  private apiUrl = 'https://speech-to-text-service-api-url'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Method to get captions from an audio file
  getCaptions(audioUrl: string): Observable<string> {
    const formData = new FormData();
    formData.append('audio', audioUrl);
    return this.http.post<{ captions: string }>(this.apiUrl, formData).pipe(
      map(response => response.captions)
    );
  }
}
