// 代码生成时间: 2025-10-06 00:00:29
// Import necessary Ionic components
import { Component } from '@angular/core';

/**
 * A calculator component that calculates different probability distributions.
 */
@Component({
  selector: 'app-probability-distribution-calculator',
  templateUrl: './probability_distribution_calculator.component.html',
  styleUrls: ['./probability_distribution_calculator.component.css']
})
export class ProbabilityDistributionCalculatorComponent {
  // Define properties for user input and output
  data: any[] = [];
  input: string = '';
  result: string = '';
  error: string = '';

  // Method to calculate the probability distribution
  calculateDistribution(): void {
    try {
      // Reset the result and error
      this.result = '';
      this.error = '';

      // Parse the input string into numbers
      const values = this.input.split(',').map(Number);

      // Check if the input is valid
      if (values.length < 2) {
        throw new Error('Please provide at least two values.');
      }

      // Calculate the mode (most frequent value)
      const mode = this.findMode(values);
      // Calculate the mean (average)
      const mean = this.calculateMean(values);
      // Calculate the median (middle value)
      const median = this.findMedian(values);

      // Format the result string
      this.result = `Mode: ${mode}, Mean: ${mean}, Median: ${median}`;
    } catch (e) {
      // Handle any errors that occurred during calculation
      this.error = e.message;
    }
  }

  // Helper method to find the mode of the data set
  private findMode(data: number[]): number {
    return data.sort((a, b) => data.filter(v => v === a).length - data.filter(v => v === b).length).pop()!;
  }

  // Helper method to calculate the mean of the data set
  private calculateMean(data: number[]): number {
    return data.reduce((acc, val) => acc + val, 0) / data.length;
  }

  // Helper method to find the median of the data set
  private findMedian(data: number[]): number {
    const mid = Math.floor(data.length / 2);
    const sortedData = data.sort((a, b) => a - b);
    return data.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2;
  }
}
