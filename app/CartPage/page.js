"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add,remove,sub } from '../Redux/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const items = useSelector((Cart) => Cart.cart);
  const handleRemove = (id) => {
    dispatch(remove(id));
    toast.error('Removed😭', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      });
  };
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('./Login')
    }
  }, []);
  const priceArray = items.map((e,index)=> e.price  )
const increase = (e,index)=>{
  dispatch(add({x:e}));
  toast.info('Wow u have Added Another😎', {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });
}

const decrease = (e, index) => {
  dispatch(sub({ id: e.id, quantity: e.quantity }));
  toast.error('You Removed One😢', {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
    });

};
  const Total = items.map((e,index)=> e.price*e.quantity*80)
  let arr =[]
  arr.push(Total)

  let totalPrice= arr[0].reduce((a, b) => a + b, 0)

  return (
    <div className="container mx-auto p-4">
      <ToastContainer/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((e, index) => (
          <div
            key={index}
            className="w-full mx-auto my-4 p-4 bg-forest-50 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            
            <div className="flex items-center justify-center">
              {/* Product Image */}
              <img
                className="w-32 h-32 object-contain rounded-full border border-gray-300"
                src={e.image}
                alt="Product Image"
              />
            </div>

 
            <div className="mt-2 text-center">
              <h2 className="text-lg font-semibold ">{e.title.slice(0, 30) + '...'}</h2>
            </div>

         
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button onClick={()=>{decrease(e,index)}} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none">
                  -
                </button>
                <input
                  className="text-center w-10 font-semibold border rounded-md"
                  type="text"
                  value={e.quantity}
                  onChange={(p)=>p.target.value}
                />
                <button onClick={()=>increase(e,index)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none">
                  +
                </button>
              </div>
              {/* Remove Button */}
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
              onClick={() => handleRemove(e.id)} // Assuming 'id' is the unique identifier for each item
            >
              Remove
            </button>
              <p className="text-lg font-semibold">{Math.round(e.price*80)}₹</p>
            </div>

            {/* Total Price */}
            <div className="mt-2 text-center">
              <p className=" text-sm">Total:{Math.round(e.price*e.quantity*80)}₹</p>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Card */}
      <div className="bg-forest-50 rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="">Total Quantity:</p>
          <p className="font-semibold">
            {items.length}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="">Total Price:</p>
          <p className="font-semibold">
        {
          Math.round(totalPrice)
        }₹
          </p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4 focus:outline-none">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Page;
