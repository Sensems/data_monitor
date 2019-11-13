import React from 'react'

class heatMapAnalysis extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '热图分析',
		}
	}
	render() {
		return (
				<div>
					<h2>{this.state.title}</h2>
				</div>
		)
	}
}

export default heatMapAnalysis;