import React from 'react';

const titleBar = (props) => {
	let broadside  =  <span className="sideBorder" style={{
		background: props.sideColor?props.sideColor:'#1890ff'
	}}> </span>;
	return (
			<div className="titleBar">
				{props.showSide && broadside}
				<span>{props.title}</span>
			</div>
	)
};

export default titleBar;