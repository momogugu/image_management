import React from 'react';

import Images from '../Images/Images.jsx';

class Album extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		image: {}
	// 	};
	// }
	// componentWillMount() {
	// 	var _this = this;
	// 	$.ajax({
	// 		type:'GET',
	// 		url: 'http://husterxsp.sinaapp.com/ria/getfile.php',
	// 		dataType: 'json',
	// 		success: function(response) {
	// 			_this.setState({image: response})
	// 			// imageArr = image.allimage;
 //            	// _this.appendImage(6);
	// 		}
	// 	});
	// }
	render() {
		return (
			<div className="water-fall">
				<div className="col-img">
					<Images image={this.props.image} />
				</div>
			</div>
		);
	}
}

export default Album;