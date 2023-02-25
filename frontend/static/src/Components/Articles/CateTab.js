import styled from "styled-components";
import "./cate-tab.css";

function CateTab(props) {
	const changeTab = (e) => {
		props.setCurrCategory(e.target.value);
	};

	return (
		<div className="tab">
			<button
				className="cate-button"
				onClick={changeTab}
				value={props.cate.tag}
			>
				{props.cate.name}
			</button>
		</div>
	);
}

export default CateTab;
