import "./featured.css";
// import useFetch from "./../../hooks/useFetch.js";
import useFetch from "../../hooks/useFetch.js";

const Featured = () => {

  const { data, loading, error, } = useFetch(
    "https://villaverse.onrender.com/api/hotels/countByCity?cities=dhaka,mymensingh,berlin"
  );

  return (
    <div className="featured">
     {loading ? (
      "Loading please wait"
     ) : ( <>
     <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>berlin</h1>
          <h2>{data[0]} Properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Mymensingh</h1>
          <h2>{data[1]} Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dhaka</h1>
          <h2>{data[2]} Properties</h2>
        </div>
      </div>
      </>)}
    </div>
  );
};

export default Featured;
