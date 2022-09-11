import { createSelector } from '@reduxjs/toolkit';

// đi từ rootReducer(store)
// cart.cartItems không thay đổi thì cái hàm tính toán nó không chạy lại vẫn giữ kết quả cũ cho mình
const cartItemsSelector = (state) => state.cart.cartItems;

// Count number of products in cart
export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total of cart
export const cartTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);

// Cứ mỗi lần gặp trường hợp cái state có thể tính toán đc nó phụ thuộc vào những state nào đấy thì có thể sử dụng selector này giúp mình tính toán những dữ liệu dẫn xuất (phụ thuộc vào những dữ liệu khác)
