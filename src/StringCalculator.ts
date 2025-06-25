export class StringCalculator {

  add(numbers: string) : number {
    if(numbers.trim() === '') return 0;

    return parseInt(numbers);
  }
}