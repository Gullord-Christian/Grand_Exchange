import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HomeBanner = ({ homeBanner }) => {
	return (
		<div className="md:py-[100px] md:px-40 px-10 bg-[#dcdcdc] rounded-xl relative h-[500px] w-[95%] max-w-[1240px] pt-1 leading-[4] mx-auto">
			<div>
				<p className="text-xl ml-1"> {homeBanner.smallText}</p>
				<h3 className="mt-1 md:text-6xl text-4xl z-[100]">
					{homeBanner.midText}
				</h3>
				<h1 className="text-white md:text-8xl text-5xl uppercase">
					{homeBanner.largeText1}
				</h1>
				<img
					src={urlFor(homeBanner.image)}
					alt="headphones"
					className="w-[200px] h-[200px] mx-auto mr-4 md:absolute md:top-[0%] md:right-[20%] md:h-[400px] md:w-[400px] z-[10]"
				/>
				<div className="">
					<Link href={`/product/${homeBanner.product}`}>
						<button
							className=" bg-[#4682b4] font-bold text-white rounded-lg text-center shadow-md hover:bg-[#F0FFFF] hover:text-[#4682b4] focus:outline-none focus:ring-2 w-[150px] h-[60px] focus:ring-black-400 focus:ring-opacity-75 mt-5 mb-5 pb-5"
							type="button">
							{homeBanner.buttonText}
						</button>
					</Link>
				</div>
				<div className="absolute right-[10%] bottom-[5%] w-[300px] leading-5 flex flex-col text-[#324d67]">
					<h5 className="mb-[12px] font-bold text-xl self-end">
						Description
					</h5>
					<p className="text-[#5f5f5f] font-normal text-end">
						{homeBanner.desc}
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
