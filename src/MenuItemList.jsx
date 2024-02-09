import { useDispatch } from "react-redux";
import { CDN_URL } from "./utils/constants";
import { addToCart } from "./utils/cartSlice";

const MenuItemList = ({ items }) => {
  // console.log(items);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div>
      {items.map((item) => {
        return (
          <div
            key={item.card.info.id}
            className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
          >
            <div className="w-10/12">
              <div className="py-2">
                <span>{item.card.info.name}</span>
                <span>
                  - ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
              </div>
              <p className="text-xs text-[#282C3F]">
                {item.card.info.description}
              </p>
            </div>
            <div className="w-2/12 p-4">
              <div className="absolute">
                <button
                  className="px-1 bg-white text-green font-medium rounded-lg shadow-lg"
                  onClick={() => handleAddItem(item.card.info)}
                >
                  Add +
                </button>
              </div>
              <img
                className="rounded-lg w-full"
                src={
                  item.card.info.imageId ? CDN_URL + item.card.info.imageId : ""
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MenuItemList;
