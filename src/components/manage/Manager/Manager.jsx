import React from 'react';

import Navigation from '../Navigation/Navigation.jsx';
import Album from '../Album/Album.jsx';

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
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll.bind(this));
	}
	handleScroll() {
	    if ($(document).scrollTop() > 500) {
	        $(".icon-up-open-big").fadeIn();
	    } else {
	        $(".icon-up-open-big").fadeOut();
	    }
	}
	handleClick(e) {
		var target = e.target;
		if (target.className == "icon-up-open-big") {
	        $("body").animate({
	            scrollTop: 0
	        }, 500);
	    }
	}
	handleEdit(image) {
		this.refs.navigation.edit(image);
	}
	changeClass(className) {
		this.setState({
			imageArr: this.state.image[className]
		});
	}
	render() {
		return (
			<div onClick={this.handleClick.bind(this)} >
				<Album edit={this.handleEdit.bind(this)} imageArr={this.state.imageArr} />
				<Navigation ref="navigation" changeClass={this.changeClass.bind(this)} />
			</div>
		);
	}
}

export default Manager;