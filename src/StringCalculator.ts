export class StringCalculator {

  add(numbers: string): number {
    if (numbers.trim() === '') return 0;

    const { delimeter, numberString } = this.extractDelimeterAndNumbers(numbers);
    const numbersArray = this.parseNumbers(numberString, delimeter);
    this.validateNumbers(numbersArray);
    return numbersArray.reduce((acc, num) => acc + num, 0)

  }

  private extractDelimeterAndNumbers(numbers: string): { delimeter: string, numberString: string } {

    if (numbers.startsWith('//')) {
      const delimeterEndIndex = numbers.indexOf('\n');
      const delimeter = numbers.slice(2, delimeterEndIndex);
      const numberString = numbers.substring(delimeterEndIndex + 1);
      return { delimeter, numberString }
    }
    return { delimeter: ',', numberString: numbers }

  }


  private parseNumbers(numbers: string, delimeter: string): number[] {
    const sanetizedNumbers = numbers.replace(/\n/g, delimeter)
    return sanetizedNumbers.split(delimeter).map(num => parseInt(num.trim()));
  }

  private validateNumbers(numbers: number[]): void {
    const negativeNumbers = numbers.filter(num => num < 0);
    if (negativeNumbers.length) {
      throw new Error(`negative numbers not allowed ${negativeNumbers.join(', ')}`)
    }
  }
}