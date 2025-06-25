import { StringCalculator } from "../StringCalculator";

describe('StringCalculator Test cases', () => {

  let calculator = new StringCalculator();

  it('Should return 0 for empty string', () => {
      expect(calculator.add('')).toBe(0)
      expect(calculator.add('   ')).toBe(0)
  })
  
  it('Should return input string as number for single input string', () => {
    expect(calculator.add('1')).toBe(1)
    expect(calculator.add('6')).toBe(6)
    expect(calculator.add('15')).toBe(15)
  })

})