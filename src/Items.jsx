import { useContext, useEffect, useState } from "react";
import RestaurantItem, { withPromotedLabel } from "./RestaurantItem";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";

import json from "./mock/resListDataMock.json";

const Items = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  // console.log("Body rendered", listOfRes);

  const RestaurantItemPromoted = withPromotedLabel(RestaurantItem);
  const FetchRestaurants = async () => {
    // const res = await fetch(
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4833526&lng=78.3870668&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
    // const json = await res.json();

    setListOfRes(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // console.log(
    //   json.data.cards[3].card.card.gridElements.infoWithStyle.restaurants
    // );
  };

  useEffect(() => {
    FetchRestaurants();
  }, []);

  // console.log(listOfRes);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>Looks like you're offline! Please check your internet connection.</h1>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="flex justify-end mb-6">
        <div className="search m-4 p-2">
          <input
            className="border border-gray-400 "
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn bg-gray-300 px-3 py-1 ml-1 rounded-lg text-sm"
            type="button"
            onClick={() => {
              // Filter the restaurant cards and update the UI
              // searchText
              console.log(searchText);

              const filteredRestaurants = listOfRes.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="filter-rating flex items-center">
          <button
            type="button"
            className="filter-btn px-2 py-1 bg-gray-300 rounded-lg text-sm mr-4"
            onClick={() => {
              // Filter the restaurants based on rating
              const filteredList = listOfRes.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        {/* <div className="filter-rating flex items-center">
          <label className="px-2">UserName :</label>
          <input
            className="p-1 m-2 border border-black"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div> */}
      </div>
      <div className="grid grid-cols-4 gap-4 auto-rows-fr">
        {filteredRestaurant.map((res) => {
          // Display the restaurants
          return (
            <Link key={res?.info.id} to={"/restaurants/" + res?.info.id}>
              {res.info.promoted ? (
                <RestaurantItemPromoted resData={res} />
              ) : (
                <RestaurantItem resData={res} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Items;
