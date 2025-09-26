import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import {
  fetchProducts,
  nextPage,
  previousPage,
  goToPage,
} from "../Slices/productSlice";
import Loader from "../components/Loader/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  const { items, status, error, currentPage, itemsPerPage } = useSelector(
    (state) => state.products
  );

  ;
  console.log('items', items);
  

  const [getPageNum, setGetPageNum] = useState();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return (
      <div className="error-container">
        <h2>⚠️ Error: {error}</h2>
      </div>
    );
  }

  const indexPage = (currentPage - 1) * itemsPerPage;
  const pageItems = items.slice(indexPage, indexPage + itemsPerPage);

  // 🔥 Calculate visible pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const visiblePages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // always first
      i === totalPages || // always last
      (i >= currentPage - 2 && i <= currentPage + 2) // 2 before & after current
    ) {
      visiblePages.push(i);
    }
  }

  return (
    <>
      {/* 🔥 single loader with fade animation */}
      <Loader isLoading={status === "loading"} />

      <div className="products-container">
        {pageItems.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} loading="lazy"/>
            <h3>{product.title}</h3>
            <p>{product.description.substring(0, 80)}...</p>
            <p>
              ⭐ {product.rating?.rate} ({product.rating?.count})
            </p>
            <p>💲{product.price}</p>
            <p className="price">Rs. {product.price * 80}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="btn-container">
        <button
          onClick={() => dispatch(previousPage())}
          disabled={currentPage === 1}
          className="btn-prev"
        >
          ←
        </button>

        {visiblePages.map((page, idx) => (
          <span key={page}>
            <button
              className={`page-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => dispatch(goToPage(page))}
            >
              {page}
            </button>

            {/* Show ... for gaps */}
            {idx < visiblePages.length - 1 &&
              visiblePages[idx + 1] !== page + 1 && <span>...</span>}
          </span>
        ))}

        <button
          onClick={() => dispatch(nextPage())}
          disabled={currentPage === totalPages}
          className="btn-next"
        >
          →
        </button>
      </div>

      {/* Go To Page input */}
      <div className="go-to-page">
        <input
          type="number"
          min={1}
          value={getPageNum || ""}
          onChange={(e) => setGetPageNum(Number(e.target.value))}
        />
        <button
          onClick={() => {
            if (getPageNum >= 1 && getPageNum <= totalPages) {
              dispatch(goToPage(getPageNum));
            } else {
              alert(`Please enter number between 1 and ${totalPages}`);
            }
          }}
          className="btn-go-page"
        >
          Go to Page
        </button>
      </div>
    </>
  );
};

export default Shop;
