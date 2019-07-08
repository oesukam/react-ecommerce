import checkCreditCard from '../../utils/checkCreditCard';

const validCreditCard = '4242424242424242';
describe('checkCreditCard', () => {
  test(`should return true for ${validCreditCard}`, () => {
    expect(checkCreditCard(validCreditCard)).toBeTruthy();
  });

  test(`should return false for 123456789`, () => {
    expect(checkCreditCard('123456789')).toBeFalsy();
  });
});
