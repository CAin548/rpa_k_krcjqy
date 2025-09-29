// 代码生成时间: 2025-09-30 03:45:21
// Import required libraries
import { Platform, File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Zip } from '@ionic-native/zip/ngx';

@Injectable({
  providedIn: 'root'
})
export class DecompressionService {

  constructor(private platform: Platform, private file: File, private fileOpener: FileOpener, private zip: Zip) {
    // Ensure the platform is ready before accessing native features
    this.platform.ready().then(() => {
      // After platform ready
    }).catch(() => {
      // Handle error if platform is not ready
    });
  }

  /**
   * Decompresses a file at the specified path.
   * @param {string} zipFilePath The path to the zip file to decompress.
   * @param {string} targetPath The target directory for the decompressed files.
   */
  decompressFile(zipFilePath: string, targetPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zip.unzip(zipFilePath, targetPath)
        .then((result) => {
          console.log('Unzipped file:', result);
          resolve(result);
        })
        .catch((error) => {
          console.error('Error unzipping file:', error);
          reject(error);
        });
    });
  }

  /**
   * Opens the decompressed file at the specified path.
   * @param {string} filePath The path to the file to open.
   */
  openDecompressedFile(filePath: string): void {
    this.fileOpener.open(filePath, 'application/octet-stream', {
      error: (e) => console.error('Error opening file:', e),
      success: () => console.log('File opened successfully')
    });
  }
}

// Example usage:
// const decompressionService = new DecompressionService();
// decompressionService.decompressFile('path/to/file.zip', 'path/to/destination/folder').then(() => {
//   decompressionService.openDecompressedFile('path/to/decompressed/file');
// }).catch((error) => {
//   console.error('Decompression failed:', error);
// });