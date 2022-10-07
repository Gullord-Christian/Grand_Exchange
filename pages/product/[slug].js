import React, { useState } from "react";
import { urlFor, client } from "../../lib/client";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from "react-icons/ai";

import { useStateContext } from "../../context/StateContext";
import { Product } from "../../components";

const ProductDetail = ({ product, products }) => {
	const { image, name, detail, price } = product;
	const { increaseQty, decreaseQty, qty, addCart, setShowCart } =
		useStateContext();

	const [index, setIndex] = useState(0);

	const handleBuyNow = () => {
		addCart(product, qty);

		setShowCart(true);
	};

	return (
		<div>
			<div className="flex md:gap-[40px] m-[40px] mt-[60px] text-[#3b1e1e]">
				<div>
					<div className="rounded-xl bg-[#ebebeb] md:w-[400px] md:h-[400px] w-[80px] h-[80px] cursor-pointer hover:scale-105 ease-in duration-300 hover:bg-[#4682B4]">
						<img
							src={urlFor(image && image[index])}
							alt=""
							className="md:h-full md:w-full h-[80px] w-[80px]"
						/>
					</div>
					<div className="md:flex hidden gap-[10px] mt-[10px]">
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item)}
								className={
									i === index
										? "rounded-[8px] bg-[#ebebeb] w-[70px] h-[70px] cursor-pointer"
										: "rounded-[8px] bg-[#ebebeb] w-[70px] h-[70px] cursor-pointer"
								}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>
				<div className="product-details-desc md:text-left text-right">
					<h1 className="md:pr-[0px] pr-[80px] text-4xl">{name}</h1>
					<div className="text-[#4682B4] mt-4 flex gap-1 md:justify-start justify-end md:pr-[0px] pr-[80px]">
						<div className="flex">
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4 className="mt-3 md:pr-[0px] pr-[80px]">Details:</h4>
					<p className="mt-3 md:pr-[0px] pr-[80px]">{detail}</p>
					<p className="text-[26px] font-bold mt-7 text-[#4682B4] md:pr-[0px] pr-[80px]">
						${price}
					</p>
					<div className="flex gap-[20px] mt-[10px] md:float-left float-right pr-[80px]">
						<h3>Quantity: </h3>
						<p className="border-gray-900 border-[1px] flex">
							<span
								className="text-[16px] py-[6px] px-[8px] border-r border-gray-900 cursor-pointer"
								onClick={decreaseQty}>
								<AiOutlineMinus />
							</span>
							<span className="border-gray-900 border-r py-[3px] px-[6px]">
								{qty}
							</span>
							<span
								className="text-[16px] py-[6px] px-[8px] border-r border-gray-900 cursor-pointer"
								onClick={increaseQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className="flex md:gap-[30px] gap-[10px] mt-[50px]">
						<button
							type="button"
							className="py-2 px-4 bg-white text-[#4682B4] rounded-lg shadow-md hover:bg-[#4682B4] hover:text-white hover:border-white hover:border-solid hover:border-2  focus:outline-none focus:ring-2 md:mt-10 h-[40px] focus:ring-black-400 focus:ring-opacity-75 hover:scale-105 align-center ease-in duration-300 md:w-[157px] w-[120px]"
							onClick={() => addCart(product, qty)}>
							Add to Cart
						</button>
						<button
							type="button"
							className="py-2 px-4 bg-[#4682B4] text-white rounded-lg shadow-md hover:bg-white hover:text-[#4682B4] hover:border-[#4682B4] hover:border-solid hover:border-2 focus:outline-none focus:ring-2 md:w-[157px] w-[100px] md:mt-10 h-[40px] focus:ring-black-400 focus:ring-opacity-75 hover:scale-105 align-center ease-in duration-300 mr-5"
							onClick={handleBuyNow}>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div className="mt-[120px] w-full">
				<h2 className="text-center m-[50px] text-[#3b1e1e] ">
					You may also like
				</h2>
				<div className="relative h-[400px] w-full overflow-x-hidden">
					<div className="md:flex justify-center gap-[15px] mt-[20px]grid md:col-span-6 col-span-3 ">
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

	const products = await client.fetch(query);
	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	return {
		props: { products, product },
	};
};

export default ProductDetail;
