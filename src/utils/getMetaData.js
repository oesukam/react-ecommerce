const getMetaData = ({ count = 0, page = 1, limit = 20 } = {}) => ({
  pages: Math.ceil(count / 20),
  page: parseInt(page, 10),
  total: count,
});

export default getMetaData;
