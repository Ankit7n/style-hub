import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import { fetchProducts } from "../Slices/productSlice";

const Home = () => {
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, fetchProducts]);

  if (status === "failed") {
    return (
      <div className="error-container">
        <h2>⚠️ Error: {error}</h2>
      </div>
    );
  }

  // Pick first few products as demo
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);
  const specialOffers = products.slice(8, 12);

  return (
    <div className="home-container">
      {/*  loader */}
      <Loader isLoading={status === "loading"} />

      {/*  Promotion Banner */}
      <section className="promo-banner">
        <h1>🔥 Big Summer Sale!</h1>
        <p>Up to 50% off on selected items. Limited time only!</p>
        <Link to="/shop" className="shop-now-btn">
          Shop Now
        </Link>
      </section>

      {/* New Arrivals */}
      <section className="home-section">
        <h2>🆕 New Arrivals</h2>
        <div className="products-container">
          {newArrivals.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>💲{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  Best Sellers */}
      <section className="home-section">
        <h2>⭐ Best Sellers</h2>
        <div className="products-container">
          {bestSellers.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>💲{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  Special Offers */}
      <section className="home-section">
        <h2>💎 Special Offers</h2>
        <div className="products-container">
          {specialOffers.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>💲{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
