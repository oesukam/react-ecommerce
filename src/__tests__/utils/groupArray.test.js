import groupArray from '../../utils/groupArray';

describe('groupArray.js', () => {
  test('should return grouped array', () => {
    const arr = [
      { name: 'name1', value: 'value'},
      { name: 'name1', value: 'value'},
      { name: 'name2', value: 'value'},
      { name: 'name2', value: 'value'},
    ]
    const groupedArray = groupArray(arr, 'name');
    expect(groupedArray).toHaveProperty('name1')
    expect(groupedArray).toHaveProperty('name2')
  })
});