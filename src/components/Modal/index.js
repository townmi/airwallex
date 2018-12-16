import React, { Component } from 'react';
import './style.scss';

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.close = this.close.bind(this);
	}
	componentWillReceiveProps(nextProps) {

	}
	render() {
		return (
			this.props.show ?
				<div className="modal-container" onClick={this.close}>
					<div className="modal-body">
						{this.props.children}
					</div>
				</div>
				:
				null
		);
	}
	close(e) {
		const {
			close
		} = this.props;
		if (e.target === e.currentTarget) {
			close && close();
		}
	}
}