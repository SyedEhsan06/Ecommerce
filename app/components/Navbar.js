"use client"
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import {useDispatch} from 'react-redux'
const Navbar = () => {
 let tl = gsap.timeline()
    useEffect(() => {
    tl.from(".headtext,.links,.fa-cart-shopping ,.logoutBtn  ",{
        y:-100,
        duration:1,
        opacity:0,
        delay:1,
        stagger:0.4
    })
  }, [])
  
    return (
    <>
      <nav className="bg-slate-200 border-slate-200 border-b-4 p-5 flex justify-between align-middle items-center ">
        <div className="left-section">
           <Link href='/'> <h1 className=" headtext font-xm text-xl text-black hover:text-teal-600 hover:scale-110 cursor-pointer">Ecommerce</h1></Link>
        </div>
        <div className="middle-section text-black flex justify-center align-middle gap-9 ">
            <Link href='./Mens'><h2 className="links font-semibold cursor-pointer hover:scale-110 hover:text-teal-400">Mens Clothes</h2></Link>
            <Link href='./Womens'><h2 className="links font-semibold cursor-pointer hover:scale-110 hover:text-teal-400">Womens Clothes</h2></Link>
            <Link href='./Electronics'><h2 className="links font-semibold cursor-pointer hover:scale-110 hover:text-teal-400">Electronics</h2></Link>
        </div>
        <div className="right-section flex items-center gap-4">
        <Link href="./CartPage"><i className="
       fa-solid fa-cart-shopping  text-black text-xl hover:scale-110 hover:text-teal-500 cursor-pointer"></i></Link>
            <button className="btn logoutBtn bg-teal-400 text-black p-1 rounded hover:bg-teal-500  ">LogOut</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
