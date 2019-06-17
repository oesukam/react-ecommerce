module.exports = {
  currentUser: {
    accessToken: localStorage.getItem('accessToken'),
    userError: { message: '', field: '' },
    authModal: '',
    isAuth: localStorage.getItem('accessToken') || false,
    loggingIn: false,
    signingUp: false,
    user: {},
    authForm: {
      email: {
        value: '',
        valid: true,
      },
      password: {
        value: '',
        valid: true,
      },
      name: {
        value: '',
        valid: true,
      },
    },
  },
  item: {
    loadingItems: false,
    loadingItem: false,
    error: { message: '', field: '' },
    items: [],
    item: {},
    itemAttributes: {
      Color: [],
      Size: [],
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
  cart: {
    loadingCartProducts: false,
    loadingCartProduct: false,
    submittingCartProduct: false,
    clearingCart: false,
    cartModal: false,
    error: { message: '', field: '' },
    cartTotalAmount: 0,
    cartProducts: [],
    cartProduct: {},
    cartProductForm: {
      cart_id: '',
      product_id: '',
      quantity: 1,
      attributes: '',
      size: '',
      color: '',
    },
  },
};
