export class StringCalculator {

  private static readonly DEFAULT_DELIMITER = ',';
  private static readonly CUSTOM_DELIMITER_PREFIX = '//';
  private static readonly NEWLINE_DELIMITER = '\n';

  add(numbers: string): number {
    if (this.isEmpty(numbers)) return 0;

    const { delimiter, numberString } = this.extractDelimeterAndNumbers(numbers);
    const numberArray = this.parseNumbers(numberString, delimiter);
    this.validateNumbers(numberArray);
    return this.sumNumbers(numberArray);

  }

  private isEmpty(numbers: string): boolean {
    return numbers.trim() === '';
  }

  private extractDelimeterAndNumbers(numbers: string): { delimiter: string, numberString: string } {

    if (this.hasCustomDelimiter(numbers)) {
      const delimeterEndIndex = numbers.indexOf(StringCalculator.NEWLINE_DELIMITER);
      const delimiter = numbers.slice(StringCalculator.CUSTOM_DELIMITER_PREFIX.length, delimeterEndIndex);
      const numberString = numbers.substring(delimeterEndIndex + 1);
      return { delimiter, numberString }
    }
    return { delimiter: StringCalculator.DEFAULT_DELIMITER, numberString: numbers }

  }


  private parseNumbers(numbers: string, delimiter: string): number[] {
    const sanetizedNumbers = this.normalizeDelimiters(numbers, delimiter);
    return this.convertToNumbers(sanetizedNumbers, delimiter);
  }

  private normalizeDelimiters(numbers: string, delimiter: string): string {
    return numbers.replace(new RegExp(StringCalculator.NEWLINE_DELIMITER, 'g'), delimiter);
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
}