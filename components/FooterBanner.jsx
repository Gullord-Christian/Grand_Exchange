import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const FooterBanner = ({
	footerBanner: {
		discount,
		largeText1,
		largeText2,
		saleTime,
		smallText,
		midText,
		product,
		buttonText,
		image,
		desc,
	},
}) => {
	return (
		<div className="py-[35px] px-[25px] px-md:py-[100px] md:px-[40px] bg-[#4682B4] rounded-2xl relative h-[400px] leading-3 text-white w-[95%] mt-[120px] max-w-[1240px] mx-auto ">
			<div className="flex justify-between">
				<div className="left">
					<p className="pt-2 m-[18px]">{discount}</p>
					<h3 className="pt-2 ml-2 font-black md:text-5xl text-2xl md:ml-[18px]">
						{largeText1}
					</h3>
					<h3 className="pt-2 ml-2 font-black md:text-5xl text-3xl md:ml-[18px]">
						{largeText2}
					</h3>
					<p className="pt-3 ml-2 md:m-[18px]">Limited time sale!</p>
					<p className="pt-3 ml-2 md:m-[18px]">{saleTime}</p>
				</div>
				<div className="ml-6">
					<p className="mr-1 md:mr-[150px] pt-3">{smallText}</p>
					<h3 className="mr-1 md:mr-[150px] pt-3">{midText}</h3>
					<p className="self-end md:mr-[15px] pt-3"> {desc}</p>
					<Link href={`/product/${product}`}>
						<button className="py-2 px-4 bg-[#F5F5F5] text-[#4682B4] rounded-lg shadow-md hover:bg-gradient-to-r from-[#4682b4] to-[#B0C4DE]  hover:text-[#F5F5F5] hover:border-[#F5F5F5] hover:border-solid hover:border-2 hover:font-bold focus:outline-none focus:ring-2 w-[150px] mt-10 h-[40px] focus:ring-black-400 focus:ring-opacity-75 transition ease-in-out hover:-translate-y-1 hover:scale-110">
							{buttonText}
						</button>
					</Link>
					<img
						src={urlFor(image)}
						className="h-[160px] absolute bottom-5 right-10 md:h-[300px] md:mr-[15%]"
					/>
				</div>
			</div>
		</div>
	);
};

export default FooterBanner;
