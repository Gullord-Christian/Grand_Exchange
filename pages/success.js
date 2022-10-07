import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
// import "../styles/success.css";
import { successConfetti } from "../lib/utils";
import { useStateContext } from "../context/StateContext";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantity(0);
		successConfetti();
	}, []);
	return (
		<div className="bg-[##F5F5F5] min-h-[60vh]">
			<div className="md:w-[900px] w-[80%] m-auto mt-[160px] bg-[#dcdcdc] p-[50px] rounded-2xl flex justify-center items-center flex-col">
				<p className="text-green-600 text-4xl ml-[5px]">
					<BsBagCheckFill size={70} />
				</p>
				<h2 className="capitalize mt-[15px] text-center  md:font-black font-normal">
					Thank you for your purchase!{" "}
				</h2>
				<p className="text-base text-center font-semibold mt-2">
					Your email confirmation email will be sent shortly
				</p>
				<p className="ml-[5px] text-[#000] text-center  mt-2">
					If you have any questions, please email{" "}
					<a
						className="text-[#f02d34] mt-2 underline"
						href="mailto:order@example.com">
						order@example.com
					</a>
				</p>
				<Link href="/">
					<button
						type="button"
						className="py-2 px-4 bg-white text-[#f02d34] rounded-lg shadow-md hover:bg-[#f02d34] hover:text-white hover:border-white hover:border-solid hover:border-2 font-bold focus:outline-none focus:ring-2 mt-10 h-[40px] focus:ring-black-400 focus:ring-opacity-75">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
