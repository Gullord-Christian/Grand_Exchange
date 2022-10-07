import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
	return (
		<div className="text-center flex justify-center flex-col gap-2 text-[#141010] mt-4 py-4 px-2 font-bold items-center tracking-widest">
			<p>2022 Grand Exchange - All Rights Reserved</p>
			<p className="flex gap-2 text-[24px]">
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
		</div>
	);
};

export default Footer;
