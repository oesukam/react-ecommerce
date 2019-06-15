const getMetaData = ({ count, page, limit = 20 } = {}) => ({
  pages: Math.ceil(count / 20),
  page: parseInt(page, 10),
  total: count,
});

export default getMetaData;
