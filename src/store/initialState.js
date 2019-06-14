module.exports = {
  currentUser: {
    loginModel: false,
    isAuth: localStorage.getItem('accessToken') || false,
    user: {},
  },
  item: {
    loadingItems: false,
    loadingSingleItem: false,
    error: { message: '', field: '' },
    items: [],
    singleItem: {},
    departments: [],
    categories: [],
    departmentId: '',
    categoryId: '',
    meta: {
      page: 1,
      pages: 1,
      total: 0,
    },
  },
};
