import jsonToFormData from '../../utils/jsonToFormData';

describe('jsonToFormData', () => {
  test('should return formData with `name` item', () => {
    const data = jsonToFormData({ name: 'name' });
    expect(data.has('name')).toBeTruthy();
  });
});
