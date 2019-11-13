import React from 'react'

class pageDepth extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '访问深度',
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

export default pageDepth;