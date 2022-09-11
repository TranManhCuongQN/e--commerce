import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    // id: 1, //productId
    // product: {},
    // quantity: 1,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    addToCart(state, action) {
      // newItems = {id,product,quantity}
      const newItem = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        // tăng số lượng
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        // thêm cart
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action) {
      // truyền cho mình 1 cái payload là 1 object trong object cần có 2 thứ (id,quatity)
      const { id, quantity } = action.payload;
      // kiểm tra id có trong giỏ hàng ko
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      // truyền cho mình cái id của thằng muốn remove ra khỏi danh sách giỏ hàng
      const idNeedToRemove = action.payload;
      // hàm filter này sẽ trả về cho mình 1 mảng mới mảng này mình sẽ trả ngược vào lại cartItems (filter những thằng có id khác với thằng mình muốn remove)
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer; //default export
