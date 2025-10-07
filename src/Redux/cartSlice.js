import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// ✅ جلب كارت المستخدم
export async function getUserCart() {
  try {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: { token: localStorage.getItem("token") } }
    );

    return {
      products: res.data?.data?.products || [],
      totalPrice: res.data?.data?.totalCartPrice || 0,
    };
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch cart", { position: "top-center", duration: 1000 });
    return { products: [], totalPrice: 0 };
  }
}


// ✅ إضافة عنصر للكارت
export async function getAddToCart(productId) {
  try {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers: { token: localStorage.getItem("token") } }
    );
    toast.success("Added To Cart 🛒", { position: "top-center", duration: 1000 });
    localStorage.setItem("cartId" , res.data.data._id)
    localStorage.setItem("cartOwner", res.data.data.cartOwner);
    console.log(res.data.data);
    
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed To Add", { position: "top-center", duration: 1000 });
    return null;
  }
}

// ✅ حذف عنصر من الكارت
export async function removeItem(id) {
  try {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    toast.success("Item removed from cart", { position: "top-center", duration: 1000 });
    return id;
  } catch (error) {
    console.log(error);
    toast.error("Failed to remove item", { position: "top-center", duration: 1000 });
    return null;
  }
}

// ✅ الـ Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    error: null,
    cartData: [],       // المنتجات نفسها
    totalPrice: 0,      // السعر الكلي
  },
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingSuccess: (state, action) => {
      state.isLoading = false;
      state.cartData = action.payload.products || [];
      state.totalPrice = action.payload.totalPrice || 0;
    },
    loadingFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeFromCartState: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.product._id !== action.payload
      );
    },
    addToCartState: (state, action) => {
      state.cartData.push(action.payload);
    },
  },
});

export const {
  loadingStart,
  loadingSuccess,
  loadingFailed,
  removeFromCartState,
  addToCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
