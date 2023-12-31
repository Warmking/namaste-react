import RestCard from "./RestCard";
import foodData from "../utils/mockData";
import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [resListCopy, setResListCopy] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const onlineStatus = useOnlineStatus()
  // console.log(resList);

  // Res Menu

  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const data = await fetch(SWIGGY_API);
    const json = await data.json();

    // console.log(json?.data?.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    const apiData =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setResList(apiData);
    setResListCopy(apiData);
    // console.log(resList);
  };
  if(!onlineStatus) return <h1>Your are looking offline</h1>
  if (resList.length === 0) {
    return <ShimmerUi></ShimmerUi>;
  }

  return (
    <div className="res-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            const serchFilter = resListCopy.filter((res) =>
              res.info.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setResList(serchFilter);
          }}
        >
          Search
        </button>
      </div>
      <button
        className=""
        onClick={() => {
          let filteredData = resList?.filter((res) => res.info.avgRating > 4);
          // console.log(foodData)
          setResList(filteredData);
        }}
      >
        Filter
      </button>
      {/* <div>{JSON.stringify(resList)}</div> */}
      <div className="flex flex-wrap">
        {resList?.map((res) => (
          <Link
            key={res.info.id}
            to={"restaurants/" + res.info.id}
            style={{ textDecoration: "none" }}
          >
            <RestCard resData={res} />{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
