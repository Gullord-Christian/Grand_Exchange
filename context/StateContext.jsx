import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};

	const addCart = (product, quantity) => {
		const checkCart = cartItems.find((item) => item._id === product._id);
		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
		setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
		if (checkCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);

			toast.success(`${qty} ${product.name} added to the cart.`);
		}
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item) => item._id !== product._id);

		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantity(
			(prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
		);
		setCartItems(newCartItems);
	};

	const toggleCartItemQty = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);
		const newCartItems = cartItems.filter((item) => item._id !== id);

		if (value === "increment") {
			setCartItems([
				...newCartItems,
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
			]);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
		} else if (value === "decrement") {
			if (foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);
				setTotalPrice(
					(prevTotalPrice) => prevTotalPrice - foundProduct.price
				);
				setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
			}
		}
	};

	return (
		<Context.Provider
			value={{
				showCart,
				totalPrice,
				totalQuantity,
				qty,
				cartItems,
				increaseQty,
				decreaseQty,
				addCart,
				setShowCart,
				toggleCartItemQty,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantity,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
