"use client";
import React, { useEffect } from 'react'
import { gsap } from "gsap";
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from "react-redux"
import { fetchProducts } from './Redux/productSlice';
import Loader from './Assets/LoaderX.gif'
import { add } from './Redux/CartSlice';
import { fetchProductPage } from './Redux/productPageSlice';
const page = () => {
  const dispatch = useDispatch();
  const state = useSelector((state)=> state)
  const handeleIconAdd = (e)=>{
    dispatch(add(e))
      toast.success('Added To Cart🤩', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
        
  }

  const handleBuyNow = (index )=>{

    dispatch(fetchProductPage(index))
  }
  let tl = gsap.timeline()
  useEffect(() => {
    dispatch(fetchProducts())
    tl.from(".left-section",{
        duration:1,
        opacity:0,
        delay:1,
    })
    tl.from(".right-upper,.right-lower,.right-lower-2",{
      duration:1,
      opacity:0,
 
      stagger:0.4,
  })
  tl.from("imgMain",{
    opacity:0,
    duration:1,
    delay:1,
  })

  }, [])
     
  return (
  
  <>
 <div className="main bg-slate-200 w-full h-full flex gap-3">
<div className="left-section h-3/4 w-1/2 bg-slate-50 m-4 rounded-xl overflow-hidden shadow-lg ">
    <Link href='./Mens'><img className='imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500 ' src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" /></Link>
</div>
<div className="right-section h-3/4 w-3/7 flex flex-wrap">
  <div className='right-upper bg-slate-50 w-full h-1/2 mt-4 mb-0 overflow-hidden shadow-lg rounded-xl' >
  
  <Link href="./Electronics"><img className='imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500 ' src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80" alt="" /></Link>

  </div>
  <div className='right-lower bg-slate-50 w-3/7 h-1/2 m-4 rounded-xl overflow-hidden shadow-lg'>
  
  <Link href="./Womens"><img className='imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500 ' src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1412&q=80" alt="" /></Link>
 
  </div>
  <div className='right-lower-2  bg-slate-50 w-3/7 h-1/2 m-4 rounded-xl overflow-hidden shadow-lg'>
  <Link href='./Electronics'><img className='imgMain h-full w-full p-1 object-cover rounded-xl hover:scale-110 transition-all duration-500 ' src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80" alt="" /></Link>

  </div>

</div>


 </div>
 
 <div className="line bg-white w-full h-1"></div>
<h1 className='text-center text-black font-size-200'onClick={(e)=>{dispatch(fetchProducts())}}>{state.product.isLoading?'fetching Products':'Our Products '}</h1>
<div className="line bg-white w-full h-1"></div>
<div className='page2'>

  {
  state.product.isLoading?<Image class='text-center my-0 mx-auto' src={Loader}/>:''
  }
<div className="main2 bg-slate-200 w-full h-96 flex justify-evenly flex-wrap">
    <ToastContainer/>
{
  state.product.data && state.product.data.map((e,index) =>
  <div  className="max-w-sm rounded overflow-hidden shadow-lg m-2 hover:scale-110 hover:bg-teal-50 hover:transition-all duration-100" style={{height:'370px',width:'270px'}}key={index}>
  <img style={{mixBlendMode: "darken",}} src={e.image} alt="Product" className="w-full h-1/2 object-contain" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{e.title.slice(0,30)+'...'}</div>
  </div>
  <div className="px-6 py-4">

    <Link href="/productPage"> <button onClick={()=>handleBuyNow(index)} className="bg-teal-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
 Buy Now
    </button></Link>
    <span className="ml-2">
      <i onClick={()=>{handeleIconAdd(e)}} className="siu fas fa-shopping-cart hover:scale-110 hover:text-teal-600"></i>
    </span>
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
