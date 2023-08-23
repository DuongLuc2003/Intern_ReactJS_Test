import { combineReducers } from '@reduxjs/toolkit';
import productApi , {productReducer} from "../api/product";
import cartSlice from '../features/cart/cartSlice';
import authApi from '../api/auth';
// Import thêm các reducers từ các slice khác nếu cần

const rootReducer = combineReducers({
  // Đặt tên các reducer ở đây theo tên mà bạn muốn sử dụng trong useSelector
//   products: productReducer,
  cart:cartSlice,
  [productApi.reducerPath]: productReducer,
  [authApi.reducerPath]: authApi.reducer,
  // Thêm các reducers từ các slice khác vào đây nếu cần
});

export default rootReducer;