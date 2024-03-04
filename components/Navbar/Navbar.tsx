import React from "react";
import Link from "next/link";
const Navbar = () =>{
    return(
 <nav className=" w-full px-5  bg-gray-800 fixed z-10 ">
            <div className="container flex items-center justify-between mx-auto">
                <Link href="/" className="text-2xl font-medium bg-lime-500 p-2 text-fuchsia-50 rounded-md ">
                    Shin'sCode
                </Link>
                <div>
                    <ul className="flex  items-center text-sm py-4 ">
                        <li>
                            <Link href="/" className="block text-white  px-4 py-2 hover:text-lime-500 transition-all duration-300 text-xl">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="block text-white  px-4 py-2 hover:text-lime-500 transition-all duration-300 text-xl">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="https://github.com/Sintuba" className=" text-white px-4 py-2 hover:text-lime-500 transition-all duration-300 text-xl">
                            GitHub
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
 </nav>
    );
}

export default Navbar;