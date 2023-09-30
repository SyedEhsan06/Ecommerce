"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './Redux/productSlice';
import { add } from './Redux/CartSlice';
import { fetchProductPage } from './Redux/productPageSlice';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import { fetchUser } from './Redux/user';
const Page = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const router = useRouter()
  
  const handeleIconAdd = (e,qty) => {
    dispatch(add({x:e,qty:qty}));
    toast.success('Added To Cart🤩', {
      position: 'top-right',
      autoClose: 200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleBuyNow = (index) => {
    dispatch(fetchProductPage(index));
  };

  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('./Login')
    }
    else{
      dispatch(fetchProducts());
      dispatch(fetchUser())

    }
  }, []);

  return (
    <>
    <div className='container' datatheme='cupcake'>
    <div id="main" >
      <div className="main bg-forest-200 w-full h-full flex gap-3">
        <div className="left-section w-1/2 bg-forest-50 m-4 rounded-xl overflow-hidden shadow-lg"style={{height:'80vh',border:'2px solid #dca54c'}}>
          <Link href="./Mens">
            <Image
              className="imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt=""
              width={500} // Set the width you want for the image
              height={400} // Set the height you want for the image
            />
          </Link>
        </div>
        <div className="right-section  w-3/7 flex flex-wrap"style={{height:'77.5vh'}}>
          <div style={{border:'2px solid #dca54c'}} className="right-upper bg-forest-50 w-full h-1/2 mt-4 mb-0 overflow-hidden shadow-lg rounded-xl">
            <Link href="./Electronics">
              <Image
                className="imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500"
                src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80"

                alt=""
                width={500}
                height={400}
              />
            </Link>
          </div>
          <div style={{border:'2px solid #dca54c'}} className="right-lower bg-forest-50 w-3/7 h-1/2 m-4 rounded-xl overflow-hidden shadow-lg" >
            <Link href="./Womens">
              <Image
                className="imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500"
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80"
                alt=""
                width={500}
                height={400}
              />
            </Link>
          </div>
          <div style={{border:'2px solid #dca54c'}} className="right-lower-2  bg-forest-50 w-3/7 h-1/2 m-4 rounded-xl overflow-hidden shadow-lg">
            <Link href="./Electronics">
              <Image
                className="imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500"
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1412&q=80"
                alt=""
                width={500}
                height={400}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="line bg-forest-50 w-full h-1"></div>
      <h1
        className="text-center text-forest-900 font-bold text-2xl cursor-pointer"
        onClick={() => {
          dispatch(fetchProducts());
        }}
      >
        {state.product.isLoading ? 'Fetching Products' : 'Our Products'}
      </h1>
      <div className="line bg-forest-50 w-full h-1"></div>
      <div className="page2">
        <div className="main2 bg-forest-50 w-full h-96 flex justify-evenly flex-wrap">
          <ToastContainer />
          <div className="flex flex-wrap -mx-4">
            {state.product.data &&
              state.product.data.map((e, index) => (
                <div className="w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8" key={index}>
                  <div className="card bg-forest-50 shadow-xl hover:bg-slate-600 hover:transition-all ease hover:scale-105">
                    <figure style={{mixBlendMode:"multiply",}}>
                      <Image
                      
                        className="w-full h-56 object-contain"
                        src={e.image}
                        alt="Shoes"
                        width={500}
                        height={400}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{e.title.slice(0, 30) + '...'}</h2>
                      <p>{e.description.slice(0, 60) + '...'}</p>
                      <div className="card-actions justify-around">
                        <i
                          onClick={() => {
                            handeleIconAdd(e,1);
                          }}
                          className="siu fas fa-shopping-cart hover:scale-110 hover:text-forest-600 mt-3 "
                        ></i>
                        <Link href="/productPage">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleBuyNow(index);
                            }}
                          >
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Page;
