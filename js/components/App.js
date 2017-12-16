import React from 'react';
// import AddNewItem from './AddNewItem';
import MountainRanges from './MountainRanges';
import Nav from './Nav';
import TotalCount from './TotalCount';

class App extends React.Component {
	render() {
		return (
			<div className="container">
        <TotalCount />
				<MountainRanges />
			</div>
		);
	}
}

export default App;
