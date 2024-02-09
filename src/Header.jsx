import { useState } from "react";
import { LOGO_URL } from "./utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "./utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  //Subscribing to the store using a selector
  const cartTotalQuantity = useSelector((store) => store.cart.totalQuantity);
  // console.log(cartItems);

  return (
    <div className="flex justify-between bg-blue-100 ">
      <div className="logo-container items-center">
        <img className="w-28" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="nav-items flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-2">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2">
            <Link to="/about">About</Link>
          </li>
          <li className="px-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-2 font-bold">
            <Link to="/cart">
              Cart -
              <span className="w-10 h-10 bg-orange text-black rounded-full">
                {cartTotalQuantity}
              </span>
            </Link>
          </li>
          <button
            className="px-2 mx-2 bg-blue-400 rounded-md text-white"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          {/* <li className="px-2">{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};
export default Header;
