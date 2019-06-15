module.exports = {
  currentUser: {
    loginModel: false,
    isAuth: localStorage.getItem('accessToken') || false,
    user: {},
  },
  item: {
    loadingItems: false,
    loadingItem: false,
    error: { message: '', field: '' },
    items: [],
    item: {},
    itemForm: {
      quantity: 0,
      size: 'S',
    },
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
