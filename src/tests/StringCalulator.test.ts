import { StringCalculator } from "../StringCalculator";

describe('StringCalculator Test cases', () => {

  let calculator = new StringCalculator();

  it('Should return 0 for empty string', () => {
      expect(calculator.add('')).toBe(0)
      expect(calculator.add('   ')).toBe(0)
  })

})