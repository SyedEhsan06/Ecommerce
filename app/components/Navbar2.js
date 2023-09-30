"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/user";
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const Routepath = usePathname();
  const router = useRouter();
  const items = useSelector((Cart) => Cart.cart);
  const Total = items.map((e, index) => e.price * e.quantity * 80);
  let arr = [];
  arr.push(Total);
  let totalPrice = arr[0].reduce((a, b) => a + b, 0);
  let qty = items.length;

  const handleLogout = () => {
   setTimeout(() => {
    localStorage.removeItem("token");
    router.push("./Login");
    setUserName('')
   }, 1300);
    toast.warning('LoggedOut', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("token");

      try {
        // Fetch user data with the token
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'GET',
          headers: {
            'auth-token': authToken,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserName(userData.name); 
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, ); 
console.log(userName)
  return (
    <>
      {Routepath !== "/Login" && Routepath !== "/Signup" ? (
        <div className="navbar flex justify-between bg-base-100">
          <div className="">
            <Link href="./" className="btn btn-ghost normal-case text-xl ">
              Siu Commerce
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu navbar-center menu-horizontal px-1">
              <li>
                <Link href="./Mens">Mens</Link>
              </li>
              <li>
                <Link href="./Womens">Womens</Link>
              </li>
              <li>
                <Link href="./Electronics">Electronics</Link>
              </li>
            </ul>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="badge badge-sm indicator-item">{qty}</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">{qty} Items</span>
                  <span className="text-info">Subtotal: ₹{totalPrice}</span>
                  <div className="card-actions">
                    <Link href="./CartPage">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80"
                    alt="Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="./" className="justify-between">
                    {userName}
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="./">Settings</Link>
                </li>
                <li className="w-full mt-2" onClick={handleLogout}>
                  <button className="p-3 btn btn-warning rounded-full w-full text-center hover:bg-red-600">
                   <span>LogOut</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => router.push("./Login")}
            className="btn btn-outline btn-luxury"
          >
            Login
          </button>
          <button
            onClick={() => {router.push("./Signup")}}
            className="btn btn-outline btn-warning"
          >
            SignUP
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
