"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchProductPage } from "../Redux/productPageSlice";
import { add } from "../Redux/CartSlice";
import { useRouter } from "next/navigation";
const page = () => {
  const details = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("./Login");
    } else {
      dispatch(fetchProductPage());
    }
  }, []);
  let p = details.productPage;
  let x = p.data;
  const [qty, setqty] = useState(1);
  const addedToCart = (x, qty) => {
    console.log(qty);
    dispatch(add({ x: x, qty: qty }));
    toast.success("Added To Cart", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const { title, price, image, description } = x;
  return (
    <>
      <ToastContainer />
      <div
        className="card lg:card-side bg-base-100 shadow-xl "
        style={{ margin: "2rem", borderRadius: "4rem" }}
      >
        <figure>
          <img
            style={{ height: "30rem" }}
            className="w-full object-contain "
            src={image}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title"> {title.slice(0, 30) + "..."}</h2>
          <p>{description.slice(0, 100) + "..."}</p>
          <h4 className="mx-auto my-0 text-3xl"> {Math.round(price * 80)}₹</h4>
          <div className="card-actions justify-around">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setqty(qty - 1);
                  console.log(qty);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
              >
                -
              </button>
              <input
                className="text-center w-10 font-semibold border rounded-md"
                type="text"
                value={qty}
                onChange={(e) => setqty(e.target.value)}
              />
              <button
                onClick={() => setqty(qty + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addedToCart(x, qty);
              }}
              className="btn btn-primary"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
