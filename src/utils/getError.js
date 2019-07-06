const getError = (err) => err.response && err.response.data ? err.response.data.error || err.response.data : err;

export default getError;