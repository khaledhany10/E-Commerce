// ✅ CartHook.js
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  getAddToCart,
  removeItem as removeItemFromAPI,
  loadingSuccess,
  loadingFailed,
  removeFromCartState,
  addToCartState,
  loadingStart,
} from "../Redux/cartSlice";

export function useCart() {
  const dispatch = useDispatch();
  const { cartData, isLoading, totalPrice } = useSelector((state) => state.cart);

  // ✅ جلب الكارت عند التحميل
  useEffect(() => {
    const fetchCart = async () => {
      try {
        dispatch(loadingStart());
        const data = await getUserCart(); // { products: [...], totalPrice: 1234 }
        dispatch(loadingSuccess(data));

        // ✅ تخزين الـ IDs فقط في localStorage (اختياري)
        localStorage.setItem("userCart", JSON.stringify(data.products.map(p => p._id)));
      } catch (err) {
        dispatch(loadingFailed(err));
      }
    };

    fetchCart();
  }, [dispatch]);

  // ✅ إزالة عنصر من الكارت
  const removeItem = async (productId) => {
    try {
      const removedId = await removeItemFromAPI(productId);
      if (removedId) dispatch(removeFromCartState(productId));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ إضافة عنصر للكارت
  const addItem = async (product) => {
    try {
      const res = await getAddToCart(product._id);
      if (res) {
        // بنبني نفس شكل العنصر المتوقع
        const cartProduct = { product, price: product.price };
        dispatch(addToCartState(cartProduct));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ السعر الإجمالي (احتياطي لو حصل تحديث محلي)
  const computedTotalPrice = useMemo(
    () => cartData.reduce((sum, item) => sum + item.price, 0),
    [cartData]
  );

  return {
    cartData, // 👈 دي اللي هنستخدمها في Cart.jsx
    isLoading,
    removeItem,
    addItem,
    totalPrice: totalPrice || computedTotalPrice,
  };
}
