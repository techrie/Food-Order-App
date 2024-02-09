import { useDispatch, useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { addToCart, clearCart, decrease, removeItem } from "./utils/cartSlice";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cart = useSelector((store) => store.cart);
  // console.log(cart.items);

  return (
    <div className="text-center">
      <h1 className="font-bold text-xl mb-4">Cart</h1>

      {cart.items.length === 0 ? (
        <div>
          <div className="flex flex-col items-center justify-center text-center m-4">
            <h1 className="font-semibold text-lg text-slate-700">
              Your cart is empty!
            </h1>
            <span className="text-xs text-gray-900 font-normal">
              You can go to home page to view more restaurants
            </span>
          </div>
          <Link to="/">
            <button className="bg-orange-500 px-4 py-2 text-white font-medium uppercase text-sm">
              See Restaurants Near You
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-8/12  m-auto bg-gray-100 pl-40 py-2">
          <div>
            {cart.items.map((item) => {
              return (
                <div key={item?.id} className="flex items-center my-4">
                  <h4 className="w-5/12 text-left">{item.name}</h4>
                  <div className="flex flex-col w-1/12 pt-6">
                    <div className=" flex justify-around border border-gray-400 items-center">
                      <button
                        onClick={() => {
                          dispatch(decrease(item));
                        }}
                      >
                        <FiMinus />
                      </button>
                      <p>{item.amount}</p>
                      <button onClick={() => dispatch(addToCart(item))}>
                        <FiPlus />
                      </button>
                    </div>

                    <div>
                      <button
                        className="font-medium text-gray-500"
                        onClick={() => {
                          dispatch(removeItem(item));
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <p className="p-4 w-3/12">
                    ₹{(item.price / 100) * item.amount}
                  </p>
                </div>
              );
            })}
            {/* <MenuItemList items={cartItems} /> */}
          </div>

          <div className="cart-summary w-8/12 flex justify-between pt-6 border-t border-t-black">
            <button
              className=" clear-cart w-30 h-6 px-2 rounded-md border border-gray-400 text-xs bg-transparent font-medium text-gray-900"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

            <div className="cart-checkout w-5/12 text-left">
              <div className="flex justify-between">
                <span className="font-medium"> SubTotal</span>
                <span className="amount font-bold">₹{cart.totalAmount}</span>
              </div>

              <p className="font-normal my-2 text-xs">
                Taxes and shipping calculated at checkout
              </p>
              <button className="w-full py-1  border border-gray-400 text-md bg-blue-600  rounded-md font-normal text-black mb-6">
                Check out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
