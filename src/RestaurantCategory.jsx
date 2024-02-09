import MenuItemList from "./MenuItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  console.log(data);

  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div>
      {/* {Header} */}
      <div className="w-9/12 mx-auto my-4 bg-gray-100 shadow-md p-4">
        <div
          className=" flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇</span>
        </div>
        {showItems && <MenuItemList items={data.itemCards} />}
      </div>
      {/* {Body} */}
    </div>
  );
};
export default RestaurantCategory;
