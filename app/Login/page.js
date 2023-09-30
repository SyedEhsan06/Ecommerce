"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [Credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      router.push("./");
    } else {
      alert("Wrong Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
  const toastHandle = ()=>{
    
    toast.success('Here We Go', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });

  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-data-bg">
        <div className="bg-data-card border p-6 shadow-lg rounded-lg w-96 text-data-text">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600 text-sm font-semibold">
                Email
              </label>
              <input
              required
                value={Credentials.email}
                onChange={onChange}
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full mt-2 rounded-md px-3 py-2 focus:ring focus:ring-data-accent focus:outline-none"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-600 text-sm font-semibold">
                Password
              </label>
              <input
              required
                value={Credentials.password}
                onChange={onChange}
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full mt-2 rounded-md px-3 py-2 focus:ring focus:ring-data-accent focus:outline-none"
                placeholder="Your password"
              />
            </div>
            <button
            onClick={toastHandle}
              type="submit"
              className="btn btn-primary w-full py-2 rounded-md hover:bg-luxury-darker focus:ring focus:ring-data-accent"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
