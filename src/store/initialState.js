module.exports = {
  currentUser: {
    loginModel: false,
    isAuth: localStorage.getItem('token') || false,
    user: {},
  },
  item: {
    loadingAllItems: false,
    loadingItems: false,
    allItems: [],
    singleItem: {},
  },
};
