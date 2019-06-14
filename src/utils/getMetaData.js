const getMetaData = ({ count, page, limit = 20 } = {}) => ({
  pages: Math.ceil(count / 20),
  page,
  total: count,
});

export default getMetaData;
