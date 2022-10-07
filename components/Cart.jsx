import React, { useRef } from "react";
import Link from "next/link";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantity,
		cartItems,
		setShowCart,
		toggleCartItemQty,
		onRemove,
	} = useStateContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});

		if (response.statusCode === 500) return;

		const data = await response.json();

		toast.loading("Redirecting...");

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<div
			className="md:w-[100vw] w-[75%] bg-transparent/[0.5] right-0 top-0 fixed z-[100]  transition-transform ease-in duration-300 "
			ref={cartRef}>
			<div className="h-[100vh] md:w-[600px] w-[100vw] bg-white float-right py-[40px] px-[10px] relative">
				<button
					className="flex items-center text-lg font-medium cursor-pointer gap-[2px] ml-[10px] border-none bg-transparent"
					type="button"
					onClick={() => setShowCart(false)}>
					<AiOutlineLeft />
					<span className="ml-[10px]"> Your Cart</span>
					<span className="ml-[10px] text-[#4682B4] ">
						({totalQuantity}) items{" "}
					</span>
				</button>
				{cartItems.length < 1 && (
					<div className="m-[40px] text-center">
						<AiOutlineShopping
							size={150}
							className="md:ml-[35%] ml-[28%]"
						/>
						<h3 className="font-semibold text-xl">Your cart is empty</h3>
						<Link href="/">
							<button
								type="button"
								className=" bg-[#4682b4] font-bold text-white rounded-lg text-center shadow-md focus:outline-none focus:ring-2 w-[200px] h-[40px] focus:ring-black-400 focus:ring-opacity-75 mt-5 mb-5 transition transform:scale 105 hover:translate-y-2 ease-in relative"
								onClick={() => setShowCart(false)}>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}
				<div className="mt-[15px] overflow-auto md:max-h-[70vh] md:py-[15px] px-[10px]">
					{cartItems.length >= 1 &&
						cartItems.map((item, i) => (
							<div className="flex gap-[30px] p-5" key={item._id}>
								<img
									src={urlFor(item?.image[0])}
									className="md:w-[25%] md:h-[25%] h-[75px] w-[75px] rounded-2xl bg-[#ebebeb]"
								/>
								<div className="item-desc">
									<div className="flex justify-between md:w-[350px] w-[250px] text-[#324d67]">
										<h5>{item.name}</h5>
										<h4>${item.price}</h4>
									</div>
									<div className="flex justify-between md:w-[350px] w-[250px]  text-[#324d67] mt-[60px]">
										<div>
											<p className="border-gray-900 border-[1px] flex w-[90px]">
												<span
													className="text-[16px] py-[6px] px-[8px] border-r border-gray-900"
													onClick={() =>
														toggleCartItemQty(
															item._id,
															"decrement"
														)
													}>
													<AiOutlineMinus />
												</span>
												<span className="border-gray-900 border-r py-[3px] px-[6px]">
													{item.quantity}
												</span>
												<span
													className="text-[16px] py-[6px] px-[8px]"
													onClick={() =>
														toggleCartItemQty(
															item._id,
															"increment"
														)
													}>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											className="text-2xl text-[#4682B4] cursor-pointer bg-transparent border-none"
											onClick={() => onRemove(item)}>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className="absolute bottom-[12px] right-[25px] w-[85%] py-[30px] px-[65px]">
						<div className="flex justify-between">
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
						<div className="m-auto mt-5">
							<button
								className="py-2 px-4 mx-auto bg-[#4682B4] text-white rounded-lg shadow-md  focus:outline-none hover:scale-105 align-center ease-in duration-300 focus:ring-2 md:w-[60%] w-[70%] focus:ring-black-400 focus:ring-opacity-75"
								onClick={handleCheckout}>
								Pay With Stripe
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
