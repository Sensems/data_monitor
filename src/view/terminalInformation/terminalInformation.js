import React from 'react'

class terminalInformation extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '终端信息',
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

export default terminalInformation;