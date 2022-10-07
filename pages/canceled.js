import React from "react";
import { GiTerror } from "react-icons/gi";
import Link from "next/link";

const canceled = () => {
	return (
		<div className="bg-[##F5F5F5] min-h-[60vh]">
			<div className="md:w-[900px] w-[80%] m-auto mt-[160px] bg-[#dcdcdc] p-[50px] rounded-2xl flex justify-center items-center flex-col">
				<p className="text-[#4682B4] text-4xl ml-[5px]">
					<GiTerror size={70} />
				</p>
				<h2 className="capitalize mt-[15px] text-center  md:font-black font-normal">
					It looks like this order has been cancelled.{" "}
				</h2>
				<p className="ml-[5px] text-[#000] text-center  mt-2">
					If you are experiencing any issues, please do not hesitate to
					contact us at{" "}
					<a
						className="text-[#f02d34] mt-2 underline"
						href="mailto:order@example.com">
						support@grandexchange.com
					</a>
				</p>
				<Link href="/">
					<button
						type="button"
						className="py-2 px-4 bg-white text-[#4682B4] rounded-lg shadow-md hover:bg-[#4682B4] hover:text-white hover:border-white hover:border-solid hover:border-2 font-bold focus:outline-none focus:ring-2 mt-10 h-[40px] focus:ring-black-400 focus:ring-opacity-75">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default canceled;
