import React from 'react';
import MountainActions from '../actions/mountainActions';
import MountainStore from '../stores/mountainStore';

class AddNewMoujntain extends React.Component {

	constructor(props) {
		super(props);

		this._getFreshMountain = this._getFreshMountain.bind(this);

		this.state = {
			mountain: this._getFreshMountain()
		};
	}

	_getFreshMountain() {
		return {
			description: '',
			amount: ''
		};
	}

	_updateState(event) {
		let field = event.target.name;
		let value = event.target.value;

		// If the amount is changed and it's not a float, return.
		if (value && field === 'amount' && !value.match(/^[a-z0-9.\+\-]+$/g)) {
			return;
		}

		this.state.mountain[field] = value;
		this.setState({ mountain : this.state.mountain });
	}

	_addNewMountain(event) {
		event.preventDefault();
		this.state.mountain.description = this.state.mountain.description || '-';
		this.state.mountain.amount = this.state.mountain.amount || '0';
		MountainActions.addNewItem(this.state.mountain);
		this.setState({ mountain : this._getFreshMountain() });
	}

	render() {
		return (
			<div>
				<h3 className="total-budget">${MountainStore.getTotalBudget()}</h3>
				<form className="form-inline add-mountain" onSubmit={this._addNewMountain.bind(this)}>
					<input type="text" className="form-control description" name="description" value={this.state.mountain.description} placeholder="Description" onChange={this._updateState.bind(this)} />
					<div className="input-group amount">
						<div className="input-group-addon">$</div>
						<input type="text" className="form-control" name="amount" value={this.state.mountain.amount} placeholder="Amount" onChange={this._updateState.bind(this)} />
					</div>
				    <button type="submit" className="btn btn-primary add">Add</button>
				</form>
			</div>
		)
	}
}

export default AddNewMountain;
