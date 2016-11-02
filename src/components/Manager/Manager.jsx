import React from 'react';

import Navigation from '../Navigation/Navigation.jsx';
import Album from '../Album/Album.jsx';
import Mask from '../Mask/Mask.jsx';
import Footer from '../Footer/Footer.jsx';

class Manager extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				image: {}
			};
		}
	componentWillMount() {
		var _this = this;
		$.ajax({
			type:'GET',
			url: 'http://husterxsp.sinaapp.com/ria/getfile.php',
			dataType: 'json',
			success: function(response) {
				_this.setState({
					image: response,
					imageArr: response.allimage
				});
            	// _this.appendImage(6);
			}
		});
	}
	changeClass(e) {
		var _this = this;
		console.log(e);
		_this.setState({
			imageArr: _this.state.image[e]
		});
	}
	render() {
		return (
			<div>
				<Navigation changeClass={this.changeClass.bind(this)} />
				<Album image={this.state.image} />
				<Mask />
				<Footer />
			</div>
		);
		// console.log(this.state.image);
	}
}

export default Manager;