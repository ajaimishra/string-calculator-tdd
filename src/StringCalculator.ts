export class StringCalculator {

  private static readonly DEFAULT_DELIMITER = ',';
  private static readonly CUSTOM_DELIMITER_PREFIX = '//';
  private static readonly NEWLINE_DELIMITER = '\n';
  private static readonly MAX_ALLOWED_NUMBER = 1000;

  add(numbers: string): number {
    if (this.isEmpty(numbers)) return 0;

    const { delimiters, numberString } = this.extractDelimeterAndNumbers(numbers);
    const numberArray = this.parseNumbers(numberString, delimiters);
    this.validateNumbers(numberArray);
    const filteredNumbers = this.filterValidNumbers(numberArray)
    return this.sumNumbers(filteredNumbers);

  }

  private isEmpty(numbers: string): boolean {
    return numbers.trim() === '';
  }

  private extractDelimeterAndNumbers(numbers: string): { delimiters: string[], numberString: string } {

    if (this.hasCustomDelimiter(numbers)) {
      const delimeterEndIndex = numbers.indexOf(StringCalculator.NEWLINE_DELIMITER);
      const delimiterSection = numbers.slice(StringCalculator.CUSTOM_DELIMITER_PREFIX.length, delimeterEndIndex);
      const numberString = numbers.substring(delimeterEndIndex + 1);
      const delimiters = this.parseDelimiters(delimiterSection);
      return { delimiters, numberString }
    }
    return { delimiters: [StringCalculator.DEFAULT_DELIMITER], numberString: numbers }

  }


  private parseNumbers(numbers: string, delimiters: string[]): number[] {
    let processedNumbers = this.normalizeNewlines(numbers);

    // Replace all delimiters with the first delimiter for uniform processing
    const primaryDelimiter = delimiters[0];
    for (let i = 1; i < delimiters.length; i++) {
      processedNumbers = this.replaceAll(processedNumbers, delimiters[i], primaryDelimiter);
    }

    return this.convertToNumbers(processedNumbers, primaryDelimiter);
  }

  private normalizeNewlines(numbers: string): string {
    return numbers.replace(new RegExp(StringCalculator.NEWLINE_DELIMITER, 'g'), StringCalculator.DEFAULT_DELIMITER);
  }

  private replaceAll(str: string, find: string, replace: string): string {
    return str.split(find).join(replace);
  }


  private convertToNumbers(numbers: string, delimiter: string): number[] {
    return numbers
      .split(delimiter)
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
  }

  private validateNumbers(numbers: number[]): void {
    const negativeNumbers = this.findNegativeNumbers(numbers);
    if (negativeNumbers.length) {
      this.throwNegativeNumbersException(negativeNumbers);
    }
  }

  private findNegativeNumbers(numbers: number[]): number[] {
    return numbers.filter(num => num < 0);
  }

  private hasCustomDelimiter(numbers: string): boolean {
    return numbers.startsWith(StringCalculator.CUSTOM_DELIMITER_PREFIX);
  }

  private throwNegativeNumbersException(negativeNumbers: number[]): never {
    const negativeNumbersList = negativeNumbers.join(', ');
    throw new Error(`negative numbers not allowed ${negativeNumbersList}`);
  }

  private sumNumbers(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  private filterValidNumbers(numbers: number[]): number[] {
    return numbers.filter(num => num <= StringCalculator.MAX_ALLOWED_NUMBER);
  }

  private parseDelimiters(delimiterSection: string): string[] {
    // Handle bracketed delimiters: [***] or multiple [*][%]
    if (delimiterSection.includes('[') && delimiterSection.includes(']')) {
      const bracketRegex = /\[([^\]]+)\]/g;
      const delimiters: string[] = [];
      let match;

      while ((match = bracketRegex.exec(delimiterSection)) !== null) {
        delimiters.push(match[1]);
      }

      return delimiters.length > 0 ? delimiters : [delimiterSection];
    }

    // Single character delimiter
    return [delimiterSection];
  }
}