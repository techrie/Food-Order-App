import { CDN_URL } from "./utils/constants";

const RestaurantItem = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info;

  return (
    <div className="flex flex-col w-[250px] h-full p-4 mx-2 rounded-lg  bg-gray-200 hover:bg-gray-300 hover:scale-105">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt="Res Name"
        className="res-logo rounded-xl mb-3"
      />
      <div className="text-left ml-4 flex flex-col flex-1">
        <p className="font-medium text-lg ">{name}</p>
        <p className="font-medium py-1">
          ⭐{avgRating} . {sla.slaString}
        </p>
        <h3 className="font-sans py-1 text-black-50 flex-1">
          {cuisines.join(", ")}
        </h3>
        <h3>{costForTwo}</h3>
      </div>
    </div>
  );
};

//Higher Order Component
//input RestaurantItem => RestaurantItemPromoted

export const withPromotedLabel = (RestaurantItem) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <RestaurantItem {...props} />
      </div>
    );
  };
};

export default RestaurantItem;
