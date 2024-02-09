import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resid) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchMenu = async () => {
    const res = await fetch(MENU_API + resid);
    const json = await res.json();
    setResInfo(json);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return resInfo;
};

export default useRestaurantMenu;
