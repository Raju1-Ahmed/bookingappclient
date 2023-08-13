import useFetch from "../../hooks/useFetch.js";
import Loading from "../loading/Loading.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error, reFetch } = useFetch(
    "https://villaverse.onrender.com/api/hotels?feature=true&limit=4&min=1&max=999"
  );
  // ?feature=true&limit=4&min=1&max=99

  return (
    <div className="fp">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {loading ? (
    <Loading className="col-span-full"/>
  ) : (
    <>
      {data.map((item) => (
        <div className="bg-white rounded-lg p-4 shadow-md" key={item._id}>
          <img
            src={item.photos[0]}
            alt=""
            className="w-full h-32 rounded-md mb-2"
          />
          <span className="block font-semibold text-lg mb-1">{item.name}</span>
          <span className="block text-gray-600 mb-1">{item.city}</span>
          <span className="block text-green-500 font-semibold">Starting from ${item.cheapestPrice}</span>
          {item.rating && (
            <div className="flex items-center mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                {item.rating}
              </button>
              <span className="ml-2 text-gray-600">Excellent</span>
            </div>
          )}
        </div>
      ))}
    </>
  )}
</div>

    </div>
  );
};

export default FeaturedProperties;