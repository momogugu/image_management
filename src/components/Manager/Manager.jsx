import React from 'react';

import Navigation from '../Navigation/Navigation.jsx';
import Album from '../Album/Album.jsx';
import Mask from '../Mask/Mask.jsx';
import Footer from '../Footer/Footer.jsx';

class Manager extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				image: {},
				imageArr: []
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
	changeClass(className) {
		this.setState({
			imageArr: this.state.image[className]
		});
	}
	render() {
		return (
			<div>
				<Navigation changeClass={this.changeClass.bind(this)} />
				<Album imageArr={this.state.imageArr} />
				<Mask />
				<Footer />
			</div>
		);
		// console.log(this.state.image);
	}
}

export default Manager;