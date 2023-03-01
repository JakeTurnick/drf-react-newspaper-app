import { useState } from "react";
import { nanoid } from "nanoid";
// import styled from 'styled-components'
import CateTab from "./CateTab";
import "./cate-nav.css";

// # CATEGORIES
//     BUSINESS = 'bus'
//     GAMING = 'game'
//     HEALTH = 'hlth'
//     POLITICS = 'pol'
//     WORLD = 'wrld'
// 'Gaming': 'game',
// 'Health': 'hlth',
// 'Politics': 'pol',
// 'World': 'wrld',

const INITIAL_CATES = [
	{
		name: "Business",
		tag: "bus",
	},
	{
		name: "Gaming",
		tag: "game",
	},
	{
		name: "Health",
		tag: "hlth",
	},
	{
		name: "Politics",
		tag: "pol",
	},
	{
		name: "World",
		tag: "wrld",
	},
];

function CateNav(props) {
	const [cates, setCates] = useState(INITIAL_CATES);

	const catesHTML = cates.map((cate) => (
		<CateTab
			cate={cate}
			key={nanoid()}
			setCurrCategory={props.setCurrCategory}
		/>
	));

	return <nav id="cate-nav">{catesHTML}</nav>;
}

export default CateNav;
