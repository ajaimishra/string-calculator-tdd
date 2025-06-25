export class StringCalculator {

  add(numbers: string): number {
    if (numbers.trim() === '') return 0;

    if (numbers.includes(',')) {
      const numbersArray = this.parseNumbers(numbers);
      return numbersArray.reduce((acc, num) => acc + num, 0)
    }
    return parseInt(numbers);
  }


  private parseNumbers(numbers: string): number[] {
    return numbers.split(',').map(num => parseInt(num.trim()));
  }
}