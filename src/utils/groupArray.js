const groupArray = (array, groupBy) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[groupBy];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export default groupArray;
