import { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserContext from "./utils/UserContext";
import { Provider, useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "./utils/cartSlice";

function App() {
  const [userName, setUserName] = useState();
  useEffect(() => {
    // make an API call
    const data = {
      name: "John",
    };
    setUserName(data.name);
  }, []);

  const { items } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [items]);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <ToastContainer />
      <div>
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
