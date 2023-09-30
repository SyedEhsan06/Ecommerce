"use client";
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Assets/LoaderX.gif'
import Image from 'next/image';

import {useDispatch,useSelector} from "react-redux"
import Link from 'next/link';
import { add,remove } from '@/app/Redux/CartSlice';
import { fetchProductPage } from '@/app/Redux/productPageSlice';
import { fetchTechPage } from '../Redux/techSlice';
import { useRouter } from "next/navigation";
const page = () => {
const router = useRouter()
  const dispatch = useDispatch();
  const state = useSelector((state)=> state)
  const handeleIconAdd = (e)=>{
    dispatch(add({x:e,qty:1}))

      toast.success('Added To Cart', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
        
  }

  const handleBuyNow = (e)=>{
    dispatch(fetchProductPage(e.id-1))
  }
    
    useEffect(() => {
      if(!localStorage.getItem('token')){
        router.push('./Login')
      }
      else{
        dispatch(fetchTechPage("women's%20clothing"))
  
      }
    }, []);


  return (
  
    <>
  
  <h1 className='text-center text-white font-size-50'onClick={(e)=>{dispatch(fetchTechPage())}}>{state.electronicPage.isLoading?'fetching Products':'Our Products '}</h1>
  <div className='page2'>
  
  <div className="main2 bg-forest-200 w-full flex justify-evenly flex-wrap">
      <ToastContainer/>
  {
    state.electronicPage.data && state.electronicPage.data
    .map((e,index) =>
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
                              handeleIconAdd(e);
                            }}
                            className="siu fas fa-shopping-cart hover:scale-110 hover:text-forest-600 mt-3"
                          ></i>
                          <Link href="/productPage">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleBuyNow(e);
                              }}
                            >
                              Buy Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
    )
  
  }
        
  </div>
  </div>
    </>
    )
}

export default page
