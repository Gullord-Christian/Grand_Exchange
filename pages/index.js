import React from "react";
import { Product, FooterBanner, HomeBanner } from "../components/";
import { client } from "../lib/client";

const index = ({ products, bannerData }) => {
	return (
		<>
			<HomeBanner homeBanner={bannerData.length && bannerData[0]} />

			<div className="text-center my-[40px] mx-[0px] text-[#324d67]">
				<h2 className="text-[40px] font-bold">Most Popular Products</h2>
				<p className="font-extralight text-base">See full collection</p>
			</div>
			<div className="flex flex-wrap justify-center gap-4 mt-5 w-full bg-[#F5F5F5]">
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
		</>
	);
};

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const BannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(BannerQuery);

	return { props: { products, bannerData } };
};

export default index;
