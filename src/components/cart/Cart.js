import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
import CartItem from './CartItem';
import calculatePrice from '../../utility/PriceCalculation';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    const price = calculatePrice(item.title, item.year, item.type);
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-beige-100">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Your Cart</h1>
      <div className="w-full max-w-4xl mb-4 text-right">
        <Link
          to="/"
          className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Back to Movie Search
        </Link>
      </div>
      <div className="w-full max-w-4xl mb-6 p-6 bg-white rounded shadow-md">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        ) : (
          <p className="text-xl text-green-900">Your cart is empty</p>
        )}
        {cartItems.length > 0 && (
          <>
            <div className="mt-6 text-2xl font-bold text-green-900 text-right">
              Total Price: ${totalPrice}
            </div>
            <div className="text-right mt-4 space-x-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-800 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
