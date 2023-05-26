import axios from "axios";
import React, { useEffect, useState } from "react";
import { productList } from "./Data";
const App = () => {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredItems, setFilteredItems] = useState(productList);

  const filters = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];
  const clickHandler = (category) => {
    if (selectedFilter.includes(category)) {
      setSelectedFilter(
        selectedFilter.filter((elm) => {
          return elm !== category;
        })
      );
    } else {
      setSelectedFilter([...selectedFilter, category]);
    }
  };

  useEffect(() => {
    finalData();
  }, [selectedFilter]);

  const finalData = () => {
    if (selectedFilter.length > 0) {
      let tempItems = selectedFilter.map((category) => {
        let temp = productList.filter((elm) => elm.category === category);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems(productList);
    }
  };
  return (
    <>
      <div className="">
        <h1 className="text-center mt-4 text-3xl font-semibold">
          Multi Filter{" "}
        </h1>
        <div className="text-white flex justify-center  gap-2 text-[11px] md:text-lg md:gap-8 mt-10">
          {filters.map((fil, i) => {
            return (
              <button
                key={i}
                onClick={() => clickHandler(fil)}
                className={` ${
                  selectedFilter.includes(fil) ? "bg-green-400" : ""
                } border p-1 md:px-3 md:py-1 rounded-lg bg-blue-500 shadow-lg hover:scale-105 transition-all capitalize `}
              >
                {fil}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center m-4 md:m-8">
          {filteredItems.map((elm) => {
            return (
              <div
                key={elm.id}
                className="border mt-8 p-4 rounded-xl shadow-xl hover:scale-110  transition-all duration-700"
              >
                <img
                  className="w-[120px] h-[150px] object-contain"
                  src={elm.image}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
