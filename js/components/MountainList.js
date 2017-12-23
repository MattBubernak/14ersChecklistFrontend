import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import MountainStore from '../stores/mountainStore';
import MountainCheckbox from './MountainCheckbox';
class MountainList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mountains: {},
		};

		// this._onChange = this._onChange.bind(this);
	}

	// _onChange() {
	// 	this.setState({})
	// 	this.setState({ mountains: MountainStore.getAllMountains() });
	// }

	componentWillMount() {
		//MountainStore.addChangeListener(this._onChange);
	}

	// componentWillUnmount() {
	// 	MountainStore.removeChangeListener(this._onChange);
	// }

	render() {
		return (
				<ul className="mountains-list">
					{Object.keys(this.props.mountains).map((key) => {
						return (<li key={key}>
											<MountainCheckbox id={key} user={this.props.user} name={this.props.mountains[key].name} check={this.props.mountains[key].check}/>
											{this.props.mountains[key].elevation}
										</li>);
					})}
				</ul>
		);
	}
}

export default MountainList;
