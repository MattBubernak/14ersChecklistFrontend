import React from 'react';
import MountainStore from '../stores/mountainStore';
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

	// componentWillMount() {
	// 	MountainStore.addChangeListener(this._onChange);
	// }

	// componentWillUnmount() {
	// 	MountainStore.removeChangeListener(this._onChange);
	// }

	render() {
		return (
			<ul className="mountains-list">
				{Object.values(this.props.mountains).map((mountainDetails) => {
					return (<li key={mountainDetails.id}>
										<MountainCheckbox id={mountainDetails.id} name={mountainDetails.name} checked={mountainDetails.checked}/>
										{mountainDetails.elevation}
									</li>);
				})}
			</ul>
		);
	}
}

export default MountainList;
