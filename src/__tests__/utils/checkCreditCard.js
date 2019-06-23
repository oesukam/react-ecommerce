import checkCreditCard from '../../utils/checkCreditCard';

const validCreditCard = '4242424242424242';
describe('checkCreditCard', () => {
  test(`should return true for ${validCreditCard}`, () => {
    expect(checkCreditCard(validCreditCard)).toBeTruthy();
  });

  test(`should return true for 4579`, () => {
    expect(checkCreditCard(123456789)).toBeFalsy();
  });
});
