import React from "react";
import Hero from "../components/Landing/Hero";
import About from "../components/Landing/About";
import HowToOrder from "../components/Landing/HowToOrder";

const Home = () => {
	return (
		<div className="home">
			<Hero />
			<About />
			<HowToOrder />
		</div>
	);
};

export default Home;
