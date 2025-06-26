import { StringCalculator } from "../StringCalculator";

describe('StringCalculator Test cases', () => {

  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  })

  describe('Basic functionality with bases cases', () => {

    it('should return 0 for empty string', () => {
      expect(calculator.add('')).toBe(0)
      expect(calculator.add('   ')).toBe(0)
    })

    it('should return input string as number for single input string', () => {
      expect(calculator.add('1')).toBe(1)
      expect(calculator.add('6')).toBe(6)
      expect(calculator.add('15')).toBe(15)
    })

    it('should return sum of two numbers seprated by comma', () => {
      expect(calculator.add('1,2')).toBe(3)
      expect(calculator.add('3,4')).toBe(7)
      expect(calculator.add('1,2,3')).toBe(6)
      expect(calculator.add('1,2,3,4,5,6,7,8')).toBe(36)
    })

    it('should handle any amount of numbers', () => {
      expect(calculator.add('1,2,3')).toBe(6)
      expect(calculator.add('1,2,3,4,5,6,7,8')).toBe(36)
    })
  })

  describe('Different delimeters', () => {
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

  describe('Negative number validation', () => {
    it('should throw exception for negative numbers', () => {
      expect(() => calculator.add('-1')).toThrow('negative numbers not allowed -1');
      expect(() => calculator.add('1,-2')).toThrow('negative numbers not allowed -2');
    });

    it('should show all negative numbers in exception message', () => {
      expect(() => calculator.add('-1,2,-3')).toThrow('negative numbers not allowed -1, -3');
      expect(() => calculator.add('//;\n-1;2;-3;-4')).toThrow('negative numbers not allowed -1, -3, -4');
    });
  })
  describe('Edge cases', () => {
    it('should handle extra spaces', () => {
      expect(calculator.add(' 1 , 2 ')).toBe(3);
    });

    it('should handle zero values', () => {
      expect(calculator.add('0')).toBe(0);
      expect(calculator.add('0,0,0')).toBe(0);
      expect(calculator.add('1,0,5')).toBe(6);
    });
  });


})