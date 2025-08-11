import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { sportsProducts } from "../data/mockProducts";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        if (!responseText) {
          throw new Error("Empty response from server");
        }

        let fakeStoreProducts;
        try {
          fakeStoreProducts = JSON.parse(responseText);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          throw new Error("Invalid JSON response from server");
        }

        if (!Array.isArray(fakeStoreProducts)) {
          throw new Error("Expected array of products from server");
        }

        const allProducts = [...fakeStoreProducts, ...sportsProducts];

        if (componentMounted) {
          setData(allProducts);
          setFilter(allProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to only sports products if API fails
        if (componentMounted) {
          toast.error(
            "Could not fetch external products. Showing local products only."
          );
          setData(sportsProducts);
          setFilter(sportsProducts);
        }
      } finally {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("sports")}
          >
            Sports
          </button>
        </div>

        {filter.length === 0 ? (
          <div className="col-12 text-center">
            <h3>No products found in this category</h3>
          </div>
        ) : (
          filter.map((product) => (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  {product.variants &&
                    product.variants.map((variant) => (
                      <li key={variant.id} className="list-group-item">
                        <div className="d-flex align-items-center">
                          <label
                            className="me-2 fw-bold"
                            style={{ minWidth: "80px" }}
                          >
                            {variant.name}:
                          </label>
                          <select className="form-select form-select-sm">
                            <option value="">Select {variant.name}</option>
                            {variant.options.map((option, idx) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="card-body">
                  {product.category === "sports" ? (
                    product.inStock ? (
                      <>
                        <Link
                          to={"/product/" + product.id}
                          className="btn btn-dark m-1"
                        >
                          Buy Now
                        </Link>
                        <button
                          className="btn btn-dark m-1"
                          onClick={() => {
                            toast.success("Added to cart");
                            addProduct(product);
                          }}
                        >
                          Add to Cart
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-danger m-1" disabled>
                        Out of Stock
                      </button>
                    )
                  ) : (
                    <>
                      <Link
                        to={"/product/" + product.id}
                        className="btn btn-dark m-1"
                      >
                        Buy Now
                      </Link>
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => {
                          toast.success("Added to cart");
                          addProduct(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
