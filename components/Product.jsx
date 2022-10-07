import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
const Product = ({ product: { image, name, slug, price } }) => {
	return (
		<div>
			<Link href={`/product/${slug.current}`}>
				<div className="cursor-pointer bg-[#F5F5F5] mx-auto shadow-xl shadow-gray-400 rounded-xl items-center transition-transform hover:scale-105 ease-in duration-300">
					<img
						src={urlFor(image && image[0])}
						width={250}
						height={250}
						className="rounded-xl bg-[#ebebeb]"
					/>
					<p className="font-normal ml-1">{name}</p>
					<p className="font-[800] mt-[6px] ml-1 color-black">${price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
