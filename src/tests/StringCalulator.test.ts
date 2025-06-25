import { StringCalculator } from "../StringCalculator";

describe('StringCalculator Test cases', () => {

  let calculator = new StringCalculator();

  it('should return 0 for empty string', () => {
    expect(calculator.add('')).toBe(0)
    expect(calculator.add('   ')).toBe(0)
  })

  it('should return input string as number for single input string', () => {
    expect(calculator.add('1')).toBe(1)
    expect(calculator.add('6')).toBe(6)
    expect(calculator.add('15')).toBe(15)
  })

  it('should return sum of two or more than two numbers seprated by comma', () => {
    expect(calculator.add('1,2')).toBe(3)
    expect(calculator.add('3,4')).toBe(7)
    expect(calculator.add('1,2,3')).toBe(6)
    expect(calculator.add('1,2,3,4,5,6,7,8')).toBe(36)
  })

  it('should handle newlines between numbers', () => {
    expect(calculator.add('1\n2,3')).toBe(6)
    expect(calculator.add("1\n2\n3")).toBe(6)

  })

  it('should support custom delimiters', () => {
    expect(calculator.add('//;\n6;5')).toBe(11);
    expect(calculator.add('//|\n4|5|6')).toBe(15);
    expect(calculator.add('//#\n4#5#6')).toBe(15);
  });




})