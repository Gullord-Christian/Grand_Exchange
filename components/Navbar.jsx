import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantity } = useStateContext();
	return (
		<div className="flex justify-between my-4 mx-4 items-center text-center relative">
			<p className="text-[#3b1e1e] text-[21px] font-semibold tracking-widest hover:underline">
				<Link href="/">Grand Exchange</Link>
			</p>
			<hr className="md:w-[45%] w-[25%]" />
			<button
				type="button"
				className="text-[25px] text-[#3b1e1e] cursor-pointer border-none bg-[#F5F5F5] transition transform:scale 200 hover:-translate-y-1 ease-in relative mt-[0px] mb-4 h-2 w-[28px]"
				onClick={() => setShowCart(true)}>
				<AiOutlineShoppingCart />
				<span className="absolute right-[-8px] top-0 text-xs text-[#eee] bg-[#4682B4] w-[18px] h-[18px] rounded-[50%] text-center font-semibold">
					{totalQuantity}
				</span>
			</button>

			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
