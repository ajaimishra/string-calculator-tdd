export class StringCalculator {

  add(numbers: string): number {
    if (numbers.trim() === '') return 0;

    const numbersArray = this.parseNumbers(numbers);
    return numbersArray.reduce((acc, num) => acc + num, 0)

  }


  private parseNumbers(numbers: string): number[] {
    const sanetizedNumbers = numbers.replace(/\n/g, ',')
    return sanetizedNumbers.split(',').map(num => parseInt(num.trim()));
  }
}