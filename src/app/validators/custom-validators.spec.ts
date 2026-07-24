import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  it('should reject non-numeric values in numeric fields', () => {
    expect(CustomValidators.onlyNumbers(new FormControl('abc'))).toEqual({ onlyNumbers: true });
  });

  it('should reject negative values', () => {
    expect(CustomValidators.nonNegative(new FormControl('-3'))).toEqual({ nonNegative: true });
  });

  it('should accept letters-only values', () => {
    expect(CustomValidators.onlyLetters(new FormControl('Juan Pérez'))).toBeNull();
  });
});
