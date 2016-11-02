import React from 'react';

import Images from '../Images/Images.jsx';

class Album extends React.Component {
	render() {
		return (
			<div className="water-fall">
				<div className="col-img">
					<div className="col-1"></div>
				</div>
				<div className="col-img">
					<div className="col-2"></div>
				</div>
				<div className="col-img">
					<div className="col-3"></div>
				</div>
			</div>
		);
	}
}

export default Album;